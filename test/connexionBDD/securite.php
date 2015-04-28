<?php
	/**
	 * Permet de sécuriser les données entrantes ou sortantes
	 */
    class Securite
    {
        /* Données entrantes
		 * Avant d'envoyer une chaîne dans votre requête
		 */
        public static function bdd($string)
        {
            // On regarde si le type de string est un nombre entier (int)
            if(ctype_digit($string))
            {
                $string = intval($string);
            }
            // Pour tous les autres types
            else
            {
                $string = mysql_real_escape_string($string);
            }
                 
            return $string;
        }
		
        /* Données sortantes
		 * Avant d'afficher du texte qui provient de l'internaute ou de la base de données
		 */
        public static function html($string)
        {
            return htmlentities($string);
        }
    }
?>