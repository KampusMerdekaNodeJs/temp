const { User } = require('../models');
const {comparePassword} = require('../hellpers/bcrypt');
const {generateToken} = require('../hellpers/jwt');
const {verifyToken}= require('../hellpers/jwt')


class UserController {
    static register(req, res) {
        const { full_name, email, password, gender } = req.body;
    
       
    
        User.beforeCreate((user, options) => {
          user.role = 'customer'; // Set role menjadi "customer" sebelum menyimpan ke database
          user.balance = 0; // Set balance menjadi 0 sebelum menyimpan ke database
        });
    
        User.create({
          full_name,
          email,
          password,
          gender
        })
          .then(result => {
            // Konversi balance ke format rupiah dengan tipe data string
            const formattedBalance = formatBalance(result.balance);
    
            let response = {
              id: result.id,
              full_name: result.full_name,
              email: result.email,
              gender: result.gender,
              balance: formattedBalance,
              createdAt: result.createdAt
            };
            res.status(201).json(response);
          })
          .catch(err => {
            res.status(500).json(err);
          });
      }
    static login(req, res){
        const { email, password } = req.body;
        User.findOne({
            where: {
                email
            }
        })
        .then(user => {
            if(!user){
                throw{
                    name: "User Login Error",
                    devMessage: `User with email ${email} not found`
                }
            }
            const isCorrect = comparePassword(password, user.password)
            if (!isCorrect){
                throw{
                    name: "User Login Error",
                    devMessage: `User's Password with email ${email} does not match`
                }
            }
            let payload = {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role
            }
            const token = generateToken(payload)
            
            return res.status(200).json({token})
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
    }
    static update(req, res) {
        const { full_name, email } = req.body;
      
        try {
          const token = req.headers.authorization.split(' ')[1]; 
          const decodedToken = verifyToken(token); 
      
          if (decodedToken.role !== 'admin') {
            // Jika role bukan admin, kirim respons error
            return res.status(403).json({ message: 'Access denied' });
          }
      
          User.findOne({ where: { email } })
            .then(user => {
              if (!user) {
                throw {
                  name: "User Update Error",
                  devMessage: `User with email ${email} not found`
                };
              }
      
              // Update properti pengguna
              user.full_name = full_name;
              user.email = email;
      
              return user.save();
            })
            .then(updatedUser => {
              let response = {
                id: updatedUser.id,
                full_name: updatedUser.full_name,
                email: updatedUser.email,
                gender: updatedUser.gender,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt
              };
              res.status(200).json(response);
            })
            .catch(err => {
              res.status(500).json(err);
            });
        } catch (err) {
          res.status(401).json({ message: 'Invalid token' });
        }
      }
      static delete(req, res) {
        const { id } = req.params;
      
        try {
          const token = req.headers.authorization.split(' ')[1]; 
          const decodedToken = verifyToken(token); 
      
          if (decodedToken.role !== 'admin') {
            
            return res.status(403).json({ message: 'Access denied' });
          }
      
          User.findByPk(id)
            .then(user => {
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
      
              return user.destroy();
            })
            .then(() => {
              res.status(200).json({ message: 'Your account has been successfully deleted' });
            })
            .catch(err => {
              console.error(err);
              return res.status(500).json({ message: 'Internal Server Error' });
            });
        } catch (err) {
          res.status(401).json({ message: 'Invalid token' });
        }
      }
      static topUp(req, res) {
        const { email, amount } = req.body;
    
        try {
          const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
          const decodedToken = verifyToken(token); // Verify and decode the token
    
          if (decodedToken.role !== 'admin') {
            // If the role is not admin, send an error response
            return res.status(403).json({ message: 'Access denied' });
          }
    
          User.findOne({ where: { email } })
            .then(user => {
              if (!user) {
                return res.status(404).json({ message: 'User not found' });
              }
    
              // Perform the top-up
              user.balance += amount;
              return user.save();
            })
            .then(updatedUser => {
              res.status(200).json({ message: 'Balance successfully topped up', balance: updatedUser.balance });
            })
            .catch(err => {
              console.error(err);
              return res.status(500).json({ message: 'Internal Server Error' });
            });
        } catch (err) {
          res.status(401).json({ message: 'Invalid token' });
        }
      }
      
      
      
      
      
      
      
      
      
  
        
  }
  
    
    // Fungsi untuk mengonversi balance menjadi format rupiah dengan tipe data string
    function formatBalance(balance) {
      const formattedBalance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(balance);
      return formattedBalance;
    }
  module.exports=UserController
  