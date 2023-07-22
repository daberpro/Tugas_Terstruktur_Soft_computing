<style lang="scss">
@import './scss/global.scss';

  fieldset legend{
    width: fit-content;
    height: fit-content;
    padding: 15px;
    font-weight: 800;
    // border: 1px solid rgba(0,0,0,0.25);
    border-radius: 10px;
    background-color: #130b44;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.25);
    color: white;
    // font-size: ;
  }

  fieldset {
    // border: 1px solid rgba(0,0,0,0.25);
    background: transparent;
  }

  .panel{
    // border: none;
    background: white;
    border: 2px solid rgba(0,0,0,0.25);
    border-radius: 20px;
    width: 100%;
    height: fit-content;
    padding: 20px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px,100%),1fr));
    gap: 20px;
    align-content: center;
    justify-content: center;
    align-items: center;

    // .title{
    //   grid-column: 1/4;
    // }

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

    .custom-i{
      width: 100%;
      height: fit-content;
      @include flex-wrap(flex-start,center);
      gap: 20px;
      flex-wrap: nowrap;
      overflow-x: auto;
      padding: 10px 0px;
    }

    input{
      width: 70px;
      // border: none;
      border: 1px solid rgba(0,0,0,0.25);
      outline: none;
      height: 40px;
      border-radius: 10px;
      padding: 15px 10px;
      text-align: center;
      font-family: 'Poppins', sans-serif;
    }

  }

  .table{
    // border: none;
    background: white;
    border: 2px solid rgba(0,0,0,0.25);
    border-radius: 20px;
    padding: 20px 40px;
    width: 100%;
    height: fit-content;
    @include flex-dir(flex-start,flex-start);
    gap: 10px;
    overflow-x: auto;

    .tables{
      width: 100%;
      height: fit-content;
       
      gap: 10px;
      table{
        width: 100%;
        height: fit-content;
        padding: 10px;
        border-radius: 10px;
        // border: 1px solid rgba(0,0,0,0.25);

        h3{
          margin:0px;
          padding:0px;
          height: 0px;
        }

        th,td{
          width: min(100%,100px);
          text-align: center;
          padding: 15px 10px;
        }

        th{
          font-weight: 500;
          color: black;
          // padding: 10px;
        }

        td{
          input{
            width: 100%;
            color: black;
            // border: none;
            border: 1px solid rgba(0,0,0,0.25);
            outline: none;
            // height: 40px;
            // padding: 10px 10px;
            text-align: center;
            font-family: 'Poppins', sans-serif;
          }
          border-top: 1px solid rgba(0,0,0,0.25);
        }
      }

      .dbtn{
        outline: none;
        border: none;
        background-color: #e5f4f3;
        color: #009688;
        padding: 15px 20px;
        font-size: 1.2rem;
        font-weight: 800;
        cursor: pointer;
        border-radius: 10px;
        width: 100%;
        // font-family: sans-serif !important;
        // margin: 20px;
      }
    }

  }

  // .table{
  //   overflow-x: auto;
  //   width: 100%;
  //   height: fit-content;
  //   border: 2px solid rgba(0,0,0,0.25);
  //   border-radius: 20px;
  //   padding: 20px;
  //   min-width: 100%;

  //   .tables{
  //     height: fit-content;
  //     overflow-x: auto;
  //     min-width: 100%;
  //     max-width: 100%;
  //   }
  // }

  // @media screen and (min-width: 0px) and (max-width: 522px){
  //   .table{
  //     width: 300px;
  //     .tables{
  //       width: 300px;
  //       overflow-x: auto;
  //     }
  //   }
  // }
</style>

<Navbar/>
<Header/>
<Main>
  <fieldset class="panel" slot="panel">
    <legend>
      Configuration
    </legend>
    <Input min={0} bind:element={i1} bind:value={config.dependen} config={{placeholder: 'Dependen Variabel', labelName: 'Total Target',type: 'number',id:'tt',description: 'total of product will produce'}}/>
    <Input min={0} bind:element={i2} bind:value={config.independen} config={{placeholder: 'Independen Variabel',labelName: 'Total Input',type: 'number',id:'ti',description: 'total of material to produce each product'}}/>
    <Input>
      <label style="width:100%;text-align: left;">Objective</label>
      <span>Objective of production</span>
      <div class="custom-i">
        {#each total_objective as to, i}
          <input bind:value={objective[0][i]} on:input={({target})=>{
            if(target.value.length === 0){
              target.style.width = `${target.value.length + 10}ch`;
            }else{
              target.style.width = `${target.value.length + 5}ch`;
            }
          }} placeholder="X{i}" type="number">
        {/each}
      </div>
    </Input>
  </fieldset>
  <fieldset bind:this={tab} class="table" slot="table">
    <legend>Tables Of Config</legend>
    <div id="content" class="tables">
      <table id='tb'>
        <tr>
          <th dp='Variabel'></th>
          {#each input_independen as t}
            <th dp='C_{t}'></th>
          {/each}
        </tr>
        {#each input_dependen as t,it1}
        <tr>
          <td dp='x_{t}'></td>
          {#each input_independen as u,it2}
            <td>
              <input bind:value={constrait[it2][it1]} placeholder="...Insert total C{u} in X{t}" type="number" name="">
            </td>
          {/each}
        </tr>    
        {/each}
        <tr>
          <td></td>
          {#each input_independen as u,lim}
            <td>
              <input bind:value={source_limit[lim]} placeholder="...Insert source limit" type="number" name="">
            </td>
          {/each}
        </tr>
      </table>
      <table id="lf">
        <tr>
          <th>No</th>
          <th>Linear Equation</th>
          <th>Standard Simplex Equation</th>
        </tr>
        <tr>
          <td style="background:transparent;color: #009688;">{0}</td>
          <td dp={debug_objective(objective)}></td>
          <td dp={standard_objective(objective,constrait)}></td>
        </tr>
        {#each debug_constrait(constrait,source_limit).split('\n').slice(0,debug_constrait(constrait,source_limit).split('\n').length-1) as d,p}
          <tr>
            <td style="background:transparent;color: #009688;">{p+1}</td>
            <td dp={d}></td>
            <td dp={serialize_constrait(constrait,source_limit).result[p].slice(0,serialize_constrait(constrait,source_limit).result[p].length-1).join('+') + `= ${source_limit[p]}`}>
            </td>
          </tr>
        {/each}
      </table>
      {#if results.length > 0}
        <table id="op" in:fly={{ y: 200, duration: 2000 }} out:fade>
          <tr>
            <th>Variabel</th>
            {#each standard_objective(objective,constrait).replace(/(\+|-|=|\d$)/igm,'~').split('~') as d,p}
              {#if p !== 0 && p < standard_objective(objective,constrait).replace(/(\+|-|=|\d$)/igm,'~').split('~').length-2}<th dp={d.replace(/\d*x_/igm,'x_').replace(/\d*s_/igm,'s_')}></th>{/if}
            {/each}
            <th dp="NK"></th>
          </tr>
          {#each so as d,p}
              <tr>
                <td dp={d}>{d}</td>
                {#each results?.[p] || [] as d2,k}
                  <td>{d2}</td>
                {/each}
              </tr>
          {/each}
        </table>
      {/if}
      <button class='dbtn' on:click={solving}>Start Solving</button>
    </div>
  </fieldset>
</Main>

<script>
  import {onMount,afterUpdate} from 'svelte';
  import Navbar from './component/navbar.svelte';
  import Header from './component/header.svelte';
  import Main from './component/main.svelte';
  import Input from './component/inputs.svelte';
  import { fade, fly } from 'svelte/transition';
  import {
    debug_constrait,
    serialize_constrait,
    debug_objective,
    simplex,
    get_objective
  } from './lib/LP';
  // import {dependen,independen} from './store'

  function standard_objective(objective,constrait){
    let standard_objective = ' Z ';
    for(let x of debug_objective(objective).split(' ').slice(3,debug_objective(objective).split(' ').length-1)){
      if(x !== '+') standard_objective += ` - ${x}`;
    }
    constrait.forEach((d,i) => standard_objective += ` - 0s_${i}`)
    standard_objective += ' = 0';
    return standard_objective;
  }

  function solving(){
    const serialize = serialize_constrait(constrait,source_limit);
    const _objective = get_objective(objective[0],serialize.shape);
    results = simplex(serialize,_objective,false,0)?.results || [];

  }

  let tab;
  let i1,i2,total_objective = [];
  let input_dependen = [],input_independen = [];
  let constrait = [], objective = [], source_limit = [], so = [];
  let linear_formula = [];
  let results = [];

  const config = {
    dependen: 2,
    independen: 3
  };

  $: (()=>{
        total_objective = [];
        for(let x = 0; x < config.dependen; x++){
          total_objective = [...total_objective,x];
        }
    })()

  $: (()=>{
        input_dependen = [];
        for(let x = 0; x < config.dependen; x++){
          input_dependen = [...input_dependen,x];

        }
    })()
  $: (()=>{
      input_independen = [];
      if(constrait.length !== parseInt(config.independen) || constrait[0].length !== parseInt(config.dependen)){
        objective = [new Array(config.dependen).fill(0)];
        constrait = [];
        source_limit = [];
      }
      for(let x = 0; x < config.independen; x++){
        input_independen = [...input_independen,x];
        if(constrait.length !== parseInt(config.independen) || constrait[0].length !== parseInt(config.dependen)){
          constrait = [...constrait,new Array(parseInt(config.dependen || 0)).fill(0)];
          source_limit = [...source_limit,0];

        }
      }
  })()

  onMount(()=>{
    i1.type = 'number';
    i2.type = 'number';

    // console.log(tab.getBoundingClientRect().width)
    // content.style.width = tab.getBoundingClientRect().width + 'px';
    // content.style.display = 'block';
  })
  afterUpdate(()=>{

    try{

      op.querySelectorAll('th').forEach(d =>{
        if(d.hasAttribute('dp')) katex.render(d.getAttribute('dp'),d,{
          throwOnError: false
        })
      })

      op.querySelectorAll('td').forEach(d =>{
        if(d.hasAttribute('dp')) katex.render(d.getAttribute('dp'),d,{
          throwOnError: false
        })
      })

    }catch(err){}
  
    lf.querySelectorAll('td').forEach(d =>{
      if(d.hasAttribute('dp')) katex.render(d.getAttribute('dp'),d,{
        throwOnError: false
      })
    })

    tb.querySelectorAll('th').forEach(d =>{
      katex.render(d.getAttribute('dp'),d,{
        throwOnError: false
      })
    })

    tb.querySelectorAll('td').forEach(d =>{
      if(d.hasAttribute('dp')) katex.render(d.getAttribute('dp'),d,{
        throwOnError: false
      })
    })

    so = standard_objective(objective,constrait).trim().replace(/(\+|-|=|\d$|\d.*x_\d*)/igm,'~').split('~').filter(d => d.length > 0 && d !== ' ').map(d => d.replace(/\d*s_/igm,'s_'));
    // console.log(so)
    
  })

  window.p = ()=>{

    // console.log(debug_objective(objective))
    // console.log(constrait,source_limit)
  }

</script>