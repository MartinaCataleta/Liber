const express= require ('express');
const router= express.Router();
const ProfiloController= require('../controllers/profiloController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);

/**
 * @swagger
 * /api/v1/users:                                 
 *   get:                                               
 *     summary: Recupera le informazioni del profilo dell'utente loggato
 *     description: Restituisce i dettagli completi dell'utente correntemente autenticato tramite sessione. Richiede autenticazione.
 *     tags: [Profilo]
 *     security:
 *       - cookieAuth: []                             
 *     responses:                      
 *       200:                                 
 *         description: Informazioni del profilo recuperate con successo.  
 *         content:                                                                                             
 *           application/json:                            
 *             schema:                                    
 *               type: object
 *             properties:
 *               _id:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               avatar:
 *                 type: string
 *               preferenzaGenere:
 *                 type: string
 *                 enum: ['Classici','Fantasy','Gialli','Sci-fi','Romantici','Storici','Biografici','Psicologia','Thriller','Drammatici']  
 *               bio: 
 *                 type: string                                      
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

router.get('/', ProfiloController.getInfoUser);

/**
 * @swagger
 * /api/v1/users/profile:
 *   put:
 *     summary: Modifica il profilo dell'utente loggato
 *     description: Aggiorna i campi del profilo (nome, username, avatar, generi preferiti, bio). I campi non inviati nel body rimarranno invariati. Richiede autenticazione tramite cookie.
 *     tags: [Profilo]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Il nome completo dell'utente
 *               username:
 *                 type: string
 *               avatar:
 *                 type: string
 *               preferenzaGenere:
 *                 type: string
 *                 enum: ['Classici','Fantasy','Gialli','Sci-fi','Romantici','Storici','Biografici','Psicologia','Thriller','Drammatici']
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profilo aggiornato con successo. Restituisce il nuovo stato dell'utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Profilo aggiornato con successo!"
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     username:
 *                       type: string
 *                     avatar:
 *                       type: string
 *                     preferenzaGenere:
 *                       type: string
 *                     bio:
 *                       type: string
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
 *         description: Errore interno del server durante la modifica dell'utente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */

router.put('/profile', ProfiloController.modifyUser);

module.exports = router;





