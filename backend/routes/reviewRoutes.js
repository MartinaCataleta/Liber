const express= require("express");
const router= express.Router();

const ReviewController= require("../controllers/reviewController");
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

/**
 * @swagger
 * /api/v1/books/{id}/reviews:                                 
 *   get:                                               
 *     summary: Recupera tutte le recensioni di un libro
 *     description: Restituisce l'elenco delle recensioni per un libro specifico, ordinate dalla più recente. Richiede autenticazione
 *     tags: [Recensioni]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: L'ID del libro del quale mostrare le recensioni                             
 *     responses:                      
 *       200:                                 
 *         description: Recensioni recuperate con successo. 
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 bookId:
 *                   type: string
 *                 author:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                 text:
 *                   type: string
 *                 rating:
 *                   type: integer
 *                 createdAt:
 *                   type: string
 *                   format: date-time                                    
 *       401:                                            
 *         description: Unauthorized. Cookie accessToken mancante, scaduto o non valido.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                        
 *       500:                                          
 *         description: Errore interno del server nel recupero delle recensioni.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.get("/:id/reviews",ReviewController.getReviews);

/**
 * @swagger
 * /api/v1/books/{id}/reviews:                                 
 *   post:                                               
 *     summary: Crea una nuova recensione per un libro
 *     description: Aggiunge una recensione (voto e commento) al libro specificato ed emette un evento Socket.io in tempo reale ai client connessi. Richiede autenticazione
 *     tags: [Recensioni]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: L'ID del libro da recensire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - voto
 *               - commento
 *             properties:
 *               voto:
 *                 type: integer
 *                 description: Il voto assegnato al libro
 *                 example: 5
 *               commento:
 *                 type: string
 *                 description: Il testo della recensione
 *                 example: "Un libro fantastico, lo consiglio a tutti!"                             
 *     responses:                      
 *       201:                                 
 *         description: Recensione creata con successo. Restituisce i dati popolati. 
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: object
 *             properties:
 *               _id:
 *                 type: string
 *               bookId:
 *                 type: string
 *               voto:
 *                 type: integer
 *               commento:
 *                 type: string  
 *               author:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string                                   
 *       401:                                            
 *         description: Unauthorized. Cookie accessToken mancante, scaduto o non valido.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                        
 *       500:                                          
 *         description: Errore interno del server nella creazione della recensione.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.post("/:id/reviews",ReviewController.createReviews);

/**
 * @swagger
 * /api/v1/books/{id}/reviews/{reviewId}:                                 
 *   delete:                                               
 *     summary: Elimina una singola recensione
 *     description: Cancella una recensione dal database solo se l'utente che fa la richiesta ne è l'autore. Emette un evento Socket.io di cancellazione. Richiede autenticazione.
 *     tags: [Recensioni]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: L'ID del libro della recensione
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema: 
 *           type: string
 *           description: L'ID della recensione da eliminare                          
 *     responses:                      
 *       200:                                 
 *         description: Recensione eliminata con successo. 
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: object
 *             properties:
 *               message: 
 *                 type: string
 *                 example: "Review eliminata"                                  
 *       401:                                            
 *         description: Unauthorized. Cookie accessToken mancante, scaduto o non valido.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string 
 *       403:                                            
 *         description: Forbidden. L'utente non è autorizzato a cancellare questa recensione (non è l'autore).
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string
 *                   example: "Non puoi cancellare la review"     
 *       404:
 *         description: Not Found. La recensione non esiste nel database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review non trovata"                   
 *       500:                                          
 *         description: Errore interno del server nella cancellazione della recensione.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.delete("/:id/reviews/:reviewId",ReviewController.deleteReviews);

module.exports=router;