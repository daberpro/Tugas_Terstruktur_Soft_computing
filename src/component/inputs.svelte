<style lang="scss">
	@import '../scss/global.scss';
	.input{
		width: 100%;
		height: 100%;
		@include flex-wrap(space-between,center);
		// gap: 10px;
		padding: 20px;
		background-color: #cbeae7;
		border-radius: 20px;
		
		input{
			width: 100%;
			border: none;
			background-color: transparent;
			color: black;
			// text-align: right;
			// border: 1px solid rgba(0,0,0,0.25);
			outline: none;
			height: 40px;
			border-radius: 10px;
			padding: 15px 20px;
			font-size: 1.2rem;
			font-family: 'Poppins', sans-serif;
		}

		label{
			color: #009688;
			text-align: center;
			width: fit-content;
			font-weight: 600;
			font-size: 1.2rem;
		}

		span{
			font-size: 0.8rem;
		}
	

	}

</style>

<script type="text/javascript">
	
	export let config = {};
	export let value = null;
	export let element = null;
	export let min = null;

</script>

<div class="input">
	<slot>
		<label for="{config.id}">{config.labelName}</label>
		<span>{config.description || ''}</span>
		<input on:input={({target})=>{
			if(target.value < min){
				target.value = min;
			}
		}} min={min} bind:this={element} bind:value id="{config.id}" placeholder="{config.placeholder || ''}">
	</slot>
</div>