const express= require ('express');
const router= express.Router();
const BookController= require('../controllers/bookController');
const verifyToken = require('../middleware/authMiddleware');


router.use(verifyToken);


/**
 * @swagger
 * /api/v1/books:                                 
 *   get:                                               
 *     summary: Recupera l'elenco di tutti i libri
 *     description: Estrae l'intera collezione di libri dal database.
 *     tags: [Libri]
 *     security:
 *       - cookieAuth: []                             
 *     responses:                      
 *       200:                                 
 *         description: Elenco dei libri recuperato con successo.  
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 year:
 *                   type: integer                                        
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
 *         description: Errore interno del server durante il recupero dei libri.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.get('/',BookController.getBooks);

/**
 * @swagger
 * /api/v1/books/{id}/favorite:                                 
 *   post:                                               
 *     summary: Aggiunge o rimuove un libro dai preferiti
 *     description: Se il libro è già presente nei preferiti dell'utente loggato, lo rimuove. Se non c'è, lo aggiunge. Richiede autenticazione.
 *     tags: [Libri]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: L'ID del libro da aggiungere o rimuovere
 *     responses:                      
 *       200:                                 
 *         description: Operazione completata con successo. Restituisce il nuovo stato e la lista aggiornata. 
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "Libro aggiunto"
 *                 preferiti:
 *                   type: array
 *                   items:
 *                     types: string                                       
 *       401:                                            
 *         description: Unauthorized. Cookie accessToken mancante, scaduto o non valido.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string    
 *       404:                                            
 *         description: Not found. Utente non trovato nel database.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                     
 *       500:                                          
 *         description: Errore interno del server durante l'aggiornamento dei preferiti.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.post('/:id/favorite', BookController.toggleFavorite);

/**
 * @swagger
 * /api/v1/books/biblioteca:                                 
 *   get:                                               
 *     summary: Recupera l'elenco dei libri preferiti dell'utente
 *     description: Estrae i libri salvati nei preferiti dell'utente loggato, popolandoli con i dettagli. 
 *     tags: [Libri]
 *     security:
 *       - cookieAuth: []                             
 *     responses:                      
 *       200:                                 
 *         description: Elenco dei libri preferiti recuperato con successo.  
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 author:
 *                   type: string
 *                 genre:
 *                   type: string
 *                 year:
 *                   type: integer                                        
 *       401:                                            
 *         description: Unauthorized. Cookie accessToken mancante, scaduto o non valido.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string    
 *       404:                                            
 *         description: Not found. Utente non trovato nel database.
 *         content:                                       
 *           application/json:                          
 *             schema:                                  
 *               type: object                           
 *               properties:                       
 *                 message:                    
 *                   type: string                     
 *       500:                                          
 *         description: Errore interno del server durante il recupero dei libri.
 *         content:                                  
 *           application/json:                          
 *             schema:                           
 *               type: object                  
 *               properties:                       
 *                 message:                        
 *                   type: string                  
 */

router.get('/biblioteca',BookController.getFavorites );


module.exports= router;

