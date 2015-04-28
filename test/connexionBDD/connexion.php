<?php

/**
 * La classe baseDeDonnees permet de gérer tout les traitements faite sur cette dernière
 */
class baseDeDonnees
{
	// Le nom de la base de données
	private $mabasededonnee = "propulsion_final";
	// Etat de la connexion à la base de données
	private $connection;

	/** 
	 * Permet d'effectuer une requête sur la base de données en se connectant à celle-ci
	 *
	 * $requete - La requete à effectuer sur la base de données
	 * @return - Le résultat de la requête
	 */
	public function requeteBdD($requete)
	{
		// La variable de retour
		$result = 0;
		
		// Connexion à la base de données
		$connection = mysql_connect('localhost', 'root', 'toor');
		
		if (!$connection)
		{
			// Traitement de l'erreur si il est impossible de se connecter à la base de données
			echo "Impossible d'atteindre la base de données, vous ne pourrez donc pas utiliser le site dans son intégralité. <br />";
			echo "Veuillez nous excuser pour le désagrément occasionné, nous règlerons le problème dans les plus brefs délai. <br  />";
			
			// On ferme la connexion créer précédemment
			mysql_close($connection);
			exit;
		}
		else
		{
		  if (!(mysql_select_db($this->getBaseDeDonnees(), $connection)))
		  {
			// Traitement de l'erreur
			echo "Impossible d'atteindre la base de données, vous ne pourrez donc pas utiliser le site dans son intégralité. <br />";
			echo "Veuillez nous excuser pour le désagrément occasionné, nous règlerons le problème dans les plus brefs délai. <br  />";
			
			// On ferme la connexion créer précédemment
			mysql_close($connection);
			exit;
		  }
		  else
		  {
			// Pour l'encodage
			mysql_query("SET NAMES UTF8");
			
			// Traitement pour effectuer la requête	
			$rs = mysql_query($requete, $connection);

			if (!$rs)
			{
			  // Traitement de l'erreur
			  echo "Requête à la base de données invalide, veuillez vérifier votre requête :<br />".$requete;
			}
			else
			{
			  if (mysql_num_rows($rs) == 0)
			  {
				// Traitement du cas où la requête n'a retourné aucun élément
			  }
			  
			  $result = $rs;
			  
			  // On se déconnecte de la base de données
			  mysql_close($connection);
			}
		  }
		}
		
		// On retourne le résultat de la requête effectuée sur la base de données
		return $result;
	}
	
	/**
     * Permet de renvoyer l'état de la connexion à la base de données
	 *
	 * @return - l'état de la connexion
	 */
	private function getConnection()
	{
		return $this->connection;
	}
	
	/**
     * Permet de renvoyer le nom de la base de données
	 *
	 * @return - Le nom de la base de données
	 */
	private function getBaseDeDonnees()
	{
		return $this->mabasededonnee;
	}
}

?>

