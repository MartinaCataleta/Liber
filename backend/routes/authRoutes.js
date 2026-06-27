const express = require('express');
const router = express.Router();

const AuthController = require ('../controllers/authController');

/**
 * @swagger
 * /api/v1/auth/register:                                 
 *   post:                                               
 *     summary: Registra un nuovo utente nella piattaforma
 *     tags: [Autenticazione]                            
 *     requestBody:                                       
 *       required: true                                   
 *       content:                                         
 *         application/json:                              
 *           schema:                                      
 *             type: object                               
 *             required:                                  
 *               - username                               
 *               - email                                  
 *               - password                              
 *             properties:                   
 *               username:                           
 *                 type: string                  
 *               email:                           
 *                 type: string                       
 *               password:                           
 *                 type: string                
 *     responses:                      
 *       201:                                 
 *         description: Utente registrato con successo.  
 *         content:                                     
 *           application/json:                     
 *             schema:                               
 *               type: object                       
 *               properties:                             
 *                 message:                             
 *                   type: string                     
 *                 user:                             
 *                   type: object                   
 *                   properties:                       
 *                     id:                           
 *                       type: string                 
 *                     username:                     
 *                       type: string                    
 *                     email:                             
 *                       type: string                    
 *       400:                                            
 *         description: Bad Request. L'username o l'email esiste già.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                     
 *       500:                                          
 *         description: Errore interno del server.      
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                       
 */

router.post('/register', AuthController.register);



/**
 * @swagger
 * /api/v1/auth/login:                                 
 *   post:                                               
 *     summary: Permette ad un utente esistente di accedere alla piattaforma
 *     description: Valida le credenziali e restituisce i dati dell'utente, impostando Access Token e Refresh Token nei cookie HTTP-only
 *     tags: [Autenticazione]                            
 *     requestBody:                                       
 *       required: true                                   
 *       content:                                         
 *         application/json:                              
 *           schema:                                      
 *             type: object                               
 *             required:                                                               
 *               - email                                  
 *               - password                              
 *             properties:                                 
 *               email:                           
 *                 type: string                       
 *               password:                           
 *                 type: string                
 *     responses:                      
 *       200:                                 
 *         description: Login effettuato con successo.  
 *         content:                                     
 *           application/json:                     
 *             schema:                               
 *               type: object                       
 *               properties:                             
 *                 message:                             
 *                   type: string                     
 *                 user:                             
 *                   type: object                   
 *                   properties:                       
 *                     id:                           
 *                       type: string                 
 *                     username:                     
 *                       type: string                    
 *                     email:                             
 *                       type: string                    
 *       401:                                            
 *         description: Unauthorized. Email o password non valide.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                     
 *       500:                                          
 *         description: Errore interno del server.      
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string
 *                 error: 
 *                   type: object       
 */

router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/v1/auth/logout:                                 
 *   post:                                               
 *     summary: Effettua il logout dell'utente
 *     description: Revoca il Refresh Token eliminandolo dal database e ripulisce i cookie di autenticazione dal browser.
 *     tags: [Autenticazione]                                        
 *     responses:                      
 *       200:                                 
 *         description: Logout effettuato con successo. I cookie sono stati rimossi.  
 *         content:                                     
 *           application/json:                     
 *             schema:                               
 *               type: object                       
 *               properties:                             
 *                 message:                             
 *                   type: string                     
 *                 user:                                                                
 *       500:                                          
 *         description: Errore interno del server.      
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string
 *                 error: 
 *                   type: object       
 */

router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /api/v1/auth/refresh:                                 
 *   post:                                               
 *     summary: Rigenera un nuovo Access Token
 *     description: Verifica il Refresh Token presente nei cookie. Se è valido e presente nel database, genera e imposta un nuovo Access Token nei cookie del browser
 *     tags: [Autenticazione]                                  
 *     responses:                      
 *       200:                                 
 *         description: Access Token aggiornato con successo.  
 *         content:                                     
 *           application/json:                     
 *             schema:                               
 *               type: object                       
 *               properties:                             
 *                 message:                             
 *                   type: string                                       
 *       401:                                            
 *         description: Unauthorized. Refresh Token mancante nei cookie (sessione scaduta).
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                     
 *       403:                                          
 *         description: Forbidden. Refresh Token non valido, scaduto o revocato dal database.      
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string 
 *                 error:
 *                   type: object                   
 */

router.post('/refresh', AuthController.refresh);


module.exports = router;