-- ESIR2 - JXS
-- Projet Vélo
-- Base de données : Loutre
-- Auteurs : Erwan FROC & Charles FERRON

DROP DATABASE `loutre`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de données: `loutre`
--

CREATE DATABASE `loutre` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `loutre`;

--
-- Structure de la table `batterie`
--

CREATE TABLE IF NOT EXISTS `batterie` (
  `etat` int(11) NOT NULL,
  `date` date NOT NULL,
  `datetime` datetime NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Structure de la table `distance`
--
CREATE TABLE IF NOT EXISTS `distance` (
  `parcourue` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `etat`
--

CREATE TABLE IF NOT EXISTS `etat` (
  `vitesseMax` int(11) NOT NULL,
  `distanceMaxEntreDeuxCharges` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `etat` (`vitesseMax`, `distanceMaxEntreDeuxCharges`) VALUES
(0, 0);

--
-- Structure de la table `historique`
--

CREATE TABLE IF NOT EXISTS `historique` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depart` CHAR(55) NOT NULL,
  `arrivee` CHAR(55) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `trajet`
--

CREATE TABLE IF NOT EXISTS `trajet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `depart` CHAR(55) NOT NULL,
  `arrivee` CHAR(55) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `favoris`
--

CREATE TABLE IF NOT EXISTS `favoris` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `activite` CHAR(25) NOT NULL,
  `lieu` CHAR(55) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;