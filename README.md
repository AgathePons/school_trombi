# First steps with SGBD, using PostgreSQL

Ce projet tourne sous **nodeJS** avec un serveur **Express**.  
Il utilise **EJS** comme moteur de rendu.  
Le package **dotenv** permet d'utiliser des variables d'environnement.

La base de donnée utilisée est **PostgreSQL**, on utilise le package **pg**.

L'utilisation des **sessions** pour la gestion de la "fake connexion" se fait avec **Express-session**.

## Faire tourner le projet

Installer les dépendances :

```cmd
npm i
```

Créer la base de données (en super user) :

```cmd
createdb <nomdelabase>
```

Seeder la base de données :

```cmd
psql -U <user> -d <nomdelabase> -f data/create_db.sql
```

Créer le fichier `.env`

```cmd
PORT=5000
PGURL="postgresql://user:mdp@localhost:5432/db"
```

Start le serveur :

```cmd
npm start
```

## Les routes

- `/` : homepage
- `/promos` : liste des promos
- `/promos/<id>` : détail d'une promo
- `/promos/<id>/students` : liste des étudiants d'une promo
- `/students` : liste des étudiants
- `/students` : détail d'un étudiant
- `/login` (GET) : page de login (fake login)
- `/login` (POST) : action de login (fake login)
- `/addStudent` (GET) : page pour ajouter un étudiant, accessible seulement si admin (fake admin)
- `/addStudent` (POST) : action d'ajouter un étudiant, accessible seulement si admin (fake admin)

Pour se logger en admin : 

**Nicole** user

```cmd
123456
```

Pour se logger en non admin : 

**Michel** user

```cmd
azerty
```

-------------------

## SGBD

**SGBD** : Système de Gestion de Base de Données (DBMS : DataBase Management System)

## PostgreSQL service

**Status :**

```cmd
sudo service postgresql status
```

**Start :**

```cmd
sudo service postgresql start
```

**Stop :**

```cmd
sudo service postgresql stop
```

## Connexion, création de rôles

**Pour se co en super admin** :  
`sudo -i -u postgres psql`

pour changer notre password :  
`ALTER ROLE postgres PASSWORD '<motdepasse>';`

Dans un nouveau terminal, on peut rentrer cette ligne pour permettre de créer des users

`sudo sed -i -E "s/local\ +all\ +all\ +peer/local all all md5/" /etc/postgresql/<numeroversion>/main/pg_hba.conf`

On peut aussi modifier soit-même le fichier pg_hba.conf

`sudo nano /etc/postgresql/<numeroversion>/main/pg_hba.conf`

**/!\ Remplacer le numeroversion par la version de postgres (par ex `12`) /!\ .**

Ensuite de nouveau dans le terminal postgres, on peut créer un nouveau user :

`CREATE ROLE <nomrole> WITH ENCRYPTED PASSWORD '<motdepasse>';`

(le compte existe, a un mdp, mais il n'a pas le droit de se connecter)

Pour permettre à ce user de se connecter :

`ALTER ROLE <nomrole> WITH LOGIN`

Puis pour créer une bdd :

`CREATE DATABASE <nomdb> OWNER <nomrole>;`

On peut lister les bdd et voir leur owner avec: `\l`

Ensuite, dans un nouveau terminal, on peut se connecter à la bdd via le nouveau user owner de la bdd :

`psql -U <nomrole> -d <nomdb>`

## Exécuter un fichier sql

Enfin, on peut exécuter un fichier .sql pour déployer notre bdd avec:

```cmd
psql -U nomDeLutilisateur -d nomDeLaBase -f chemin/du/fichier.sql
```

On peut aussi se connecter à psql avec le owner, puis faire

```cmd
\i chemin/du/fichier.sql
```

-------------------

## Se connecter à notre bdd via pg en JS

On peut définir notre **variable d'environnement** dans le fichier `.env`.

On va respecter la syntaxe suivante :

`PGURL="postgresql://<nomrole>:<motdepasse>@<adresseDeCo>:<port>/<nomdb>"`

-------------------

## Commandes SQL

Listes de commandes SQL

Pour se connecter à la base :

```psql -h <hote> -U <utilisateur> -d <baseDeDonnée>```

Puis on saisi le mot de passe (QUI NE S'AFFICHE PAS ! Et c'est **NORMAL**)

### /!\ Attention chaque commande doit se terminer avec un ; sinon terminal SQL ne sait pas que l'instruction est terminée

|Commande|Action|
|--------|------|
|```\dt;```|Lister les tables dans une base de donnée|
|```\d student;```|Afficher la structure d'une table|
|```SELECT * FROM "student";```| Récupère tous les étudiants avec tous les champsdepuis la table "students"|
|```SELECT "first_name" FROM "student";```| Récupère tous les first_name des étudiants depuis la table "students"|
|```SELECT * FROM "student" WHERE "promo_id" = 358;```| Récupère tous les students avec tous les champs depuis la table student ou le champ promo_id est égal à 358|
|```SELECT * FROM "promo" WHERE "name" LIKE 'Z%';```| Récupère tous les students avec tous les champs depuis la table student ou le nom commence par 'Z' |
|```SELECT * FROM "student" WHERE "promo_id" = 358 AND "first_name" LIKE 'I%';```| Récupère tous les étudiants de la promo Zagreus avec le prénom qui commence par I comme Inès |
|```SELECT COUNT(*) FROM "student" WHERE "first_name" LIKE 'I%';```| Compte le nombre de students qui remplissents les critères de la requête |

## Clé primaire

identifiant unique qui permet d'identifier un champ. Il peut y en avoir plusieurs, et ça peut être de plusieurs sorte (par exemple utiliser le numéro de sécu pour identifier de façon unique une personne).

## Clé étrangère

une colonne qui contient l'identifiant unique d'une autre table (promo_id pour les étudiants par exemple)
