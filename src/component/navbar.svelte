<style lang="scss">
@import '../scss/global.scss';
  .navbar{
  	font-family: 'Poppins', sans-serif;
  	width: 100%;
  	background-color: #e5f4f3;
  	height: fit-content;
  	padding: 20px 0px;
  	@include flex-wrap(space-between,center);

  	.left {
  		width: min(120px,30%);
  		height: 50px;
  		@include flex-wrap(center,center);

  		b{
  			text-align: center;
  			font-size: calc(0.5vw + 14px);
  		}

  	}
  	.middle {
  		width: min(400px,40%);
  		height: 50px;
  		@include flex-wrap(center,center);

  		.menu{
  			@include flex-wrap(center,center);
  			gap: 20px;
  			li{
  				list-style: none;
  				cursor: pointer;
  				a{
  					text-decoration: none;
  					color: black;
  				}
  			}
  		}

  	}

  	.right {
  		width: min(120px,30%);
  		height: 50px;
  		@include flex-wrap(center,center);

  		.menu{
  			@include flex-wrap(center,center);
  			gap: 20px;
  			li{
  				list-style: none;
  			}
  		}

  	}

  }

  @media screen and (min-width: 0px) and (max-width: 522px){
  	.navbar{
  		.left{
  			width: calc(30% - 5px);
  		}
  		.middle{
  			width: calc(70% - 5px);
  		}
  		.right{
  			display: none;
  		}
  	}
  }
</style>

<div class="navbar">
	<div class="left">
		<b>LPSolver</b>
	</div>
	<div class="middle">
		<div class="menu">
			<li>About</li>
			<li>Source Code <i class="fa-brands fa-github"></i></li>
		</div>
	</div>
	<div class="right">
		<div class="profile">
			<img src="">
			<span></span>
		</div>
	</div>
</div>