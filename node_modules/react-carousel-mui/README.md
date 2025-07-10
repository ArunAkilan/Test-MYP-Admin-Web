<div id="top"></div>

<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/heIsThePirate/react-carousel-mui">
    <img src="images/react-logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">react-carousel-mui</h3>

  <p align="center">
    A dynamic and customizable carousel component built using React and MUI
    <br />
    <a href="https://github.com/heIsThePirate/react-carousel-mui/issues">Report a Bug</a>
  </p>
</div>

<br />

<!-- GETTING STARTED -->

## Getting Started

```sh
npm install react-carousel-mui

or

yarn add react-carousel-mui
```

## Usage

```javascript
<Carousel
  items={itemList}
  itemsPerPage={{
    xs: 2,
    sm: 2,
    tablet: 2,
    md: 3,
    lg: 3,
    xl: 3,
  }}
  itemRenderer={(item: string) => <CustomCard data={item} />}
/>
```

Please checkout the following codesandbox for a live and more rich example: [react-carousel-mui-demo](https://codesandbox.io/s/react-carousel-mui-demo-7m0x3y)


<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

[@heIsThePirate](mohitsingh1997@gmail.com)

Project Link: [https://github.com/heIsThePirate/react-carousel-mui](https://github.com/heIsThePirate/react-carousel-mui)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/heIsThePirate/react-carousel-mui.svg?style=for-the-badge
[contributors-url]: https://github.com/heIsThePirate/react-carousel-mui/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/heIsThePirate/react-carousel-mui.svg?style=for-the-badge
[forks-url]: https://github.com/heIsThePirate/react-carousel-mui/network/members
[stars-shield]: https://img.shields.io/github/stars/heIsThePirate/react-carousel-mui.svg?style=for-the-badge
[stars-url]: https://github.com/heIsThePirate/react-carousel-mui/stargazers
[issues-shield]: https://img.shields.io/github/issues/heIsThePirate/react-carousel-mui.svg?style=for-the-badge
[issues-url]: https://github.com/heIsThePirate/react-carousel-mui/issues
[license-shield]: https://img.shields.io/github/license/heIsThePirate/react-carousel-mui.svg?style=for-the-badge
[license-url]: https://github.com/heIsThePirate/react-carousel-mui/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/mohitsingh97
[product-screenshot]: images/screenshot.png
