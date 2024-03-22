<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://github.com/colecody27/instant-messenger/assets/71093271/950ff130-4c65-444f-b8de-f2459b2adb98" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Mumble - Instant Messenger</h3>

  <p align="center">
    This is a backend API which facilitates an instant messenger. It utilizes ejs to render web pages, Socket.io to provide live updates, and Express as the node.js framework. 
    <br />
    <br />
    <a href="https://instant-messenger-qa99.onrender.com">Visit Live App</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project

<img width="1159" alt="Screenshot 2024-03-20 at 5 40 26 PM" src="https://github.com/colecody27/instant-messenger/assets/71093271/441e65fb-72be-437d-a7df-d5a359c34f62">
<a align="center" href="https://instant-messenger-qa99.onrender.com">Try it out</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Roles 
<p align="center"> There are three roles for this application: user, channel admin, DB admin. </p>
<ul>
  <li>User - This is any user that has only registred and do not have any of their own channels. They have the ability to join channels that they have access to. </li>
  <li>Channel Admin - This is a user who has created a channel. Once they've created a channel, they can delete it at any point in time. </li>
  <li>DB Admin - This is a user who has access to the DB. Once logged into the DB, they can update an account to admin by changing a field. This admin can delete any channel, regardless of whether or not they created it. In additoin to this, a channel created by this role will include all of the current users of the application. Allowing any user to join this channel. </li>
</ul>

### Built With
- Node.js
- Express
- MongoDB
- Render
- Socket.io


<!--<img src="https://simpleicons.org/icons/express.svg" alt="Logo" width="80" height="80"> 
<!-- * [![Node][Node.js]][Next-url]
* [![Express][Express.js]][Laravel-url]
* [![Render][Render.com]][Bootstrap-url]
* [![MongDB][MongoDB.com]][Bootstrap-url]
-->

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

In order to run this project locally, you will need to clone the repo, install dependencies, and create and create a .env file.  

### Prerequisites

Npm will be required. 
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/colecody27/instant-messenger.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create .env file in root directory with these variables. Set values as desired. `.env`
   ```js
   DB_URL=''
   SALT=''
   PORT=''
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Run localhost
   ```sh
   npm run start
   ```
When attempting to message in a channel from multiple users on the same localhost. It may be necessary to create a browser instance and run in incognito mode in order to avoid cookie conflict. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

Cody Cole - Linkedin: https://linkedin.com/in/cody-cole/ 


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
