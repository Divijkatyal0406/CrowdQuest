<script>
  import { user } from './user';

  let username;
  let password;

  function login() {
    user.auth(username, password, ({ err }) => err && alert(err));
  }

  function signup() {
    user.create(username, password, ({ err }) => {
      if (err) {
        alert(err);
      } else {
        login();
      }
    });
  }
</script>

<label for="username" style="color: black; margin-left: 6em; margin-right: 6em;">Username</label>
<input name="username" bind:value={username} minlength="3" maxlength="16" style="background-color: #1877F2; width: 70%; align-self: center; border-radius: 3px;"/>

<label for="password" style="color: black;">Password</label>
<input name="password" bind:value={password} type="password" style="background-color: #1877F2; width: 70%; align-self: center; border-radius: 3px;"/>

<button class="login" on:click={login} style="background-color: #72A0C1; margin-top: 6em; margin-left: 13em; margin-right: 13em; border-radius: 20px;">Login</button>
<button class="login"  on:click={signup} style="background-color: #72A0C1; margin-top: 1em; margin-left: 13em; margin-right: 13em; border-radius: 20px;">Sign Up</button>
  
