<template>
  <nav>
    <ul>
      <router-link tag="li" to="/note/d">
        <a href="#">Create</a>
      </router-link>
      <router-link tag="li" to="/">
        <a href="#">List</a>
      </router-link>
    </ul>
  </nav>
</template>
<style lang="scss">
  body {
    margin: 0;
  }
  nav {
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #87cefa;
    a {
      color: white;
      text-decoration: none;
      padding: 17px;
      &:hover{
          background: #60acd7;
      }
    }
    ul{
      list-style: none;
      display: flex;
      li {
          margin-right: 10px;
          font-size: 20px;
          
      }
    }
  }
  .appName {
    font-size: 24px;
    text-transform: uppercase;
  }
</style>