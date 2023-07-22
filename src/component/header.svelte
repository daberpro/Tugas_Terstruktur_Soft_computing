<style lang="scss">
	@import '../scss/global.scss';

	.header{
		font-family: 'Poppins', sans-serif;
		width: 100%;
		height: fit-content;
		padding: 50px 10px;
		@include flex-dir(center,center);

		h1,h2{
			margin: 0px;
			padding: 0px;
		}

		h1{
			font-size: calc(1rem + 2vw);
		}

		h2{
			font-size: calc(1rem + 1vw);
			font-weight: 600;
		}
	}

	@media screen and (min-width: 0px) and (max-width: 522px){
		.header{
			h1{
				font-size: 2rem;
				text-align: center;
			}
			h2{
				font-size: 1.5rem;
			}
		}
	}

</style>

<div class="header">
	
	<h1>Linear Programming Solver</h1>
	<h2>By Ari Susanto</h2>

</div>
