// fungsi untuk membuat batasan
// dimana x merupakan variabel independen
// dan y variabel dependen
function debug_constrait(total_x = [],constrait_value = []){
	
	let debug = '';
	let value_index = 0;
	for(let x of total_x){
		let constrait = '';
		let index = 1;
		for(let y of x){
			constrait += ` ${y}x_${index} ${(index !== x.length)? '+': ''}`;
			index++;
		}
		debug += constrait + `<= ${constrait_value[value_index]} \n`;
		value_index++;
	}

	console.log(debug);
}

function debug_objective(total_x = []){

	let debug = ' Z =';
	for(let x of total_x){
		let index = 1;
		for(let y of x){
			debug += ` ${y}x_${index} ${(index !== x.length)? '+': ''}`;
			index++;
		}
	}
	console.log(debug);

}

function get_objective(total_x = [],shape = []){

	const result = [];
	for(let x = 0; x < shape[0]; x++){
		result.push(-total_x[x]);
	}
	for(let y = 0; y < shape[1]; y++){
		result.push(0);		
	}

	return {
		result
	}

}

function serialize_constrait(total_x = [[]],total_y = []){

	const raw_result = [],result=[];
	let index = 0;
	for(let x of total_x){
		const constrait_has_change = [];
		constrait_has_change.push(...x,...total_x.map((d,i) =>{
			if( i === index ){
				return 1;
			}
			return 0;
		}),total_y[index]);
		result.push([...x.map((d,i) => `${d}x_${i}`),...total_x.map((d,i) =>{
			if( i === index ){
				return 1;
			}
			return 0;
		}).map((d,i)=> `${d}s_${i}`),total_y[index]]);
		raw_result.push(constrait_has_change);
		index++;
	}
	const shape = [total_x[0].length,total_x.length];

	return {
		raw_result,
		shape,
		result,
		constrait_value: total_y,
		debug(objective){
			const k = {};
			result[0].forEach((d,i) =>{
				if(typeof d === 'string') k[d.replace(/^\d/igm,'')] = objective.result[i]
			});
			const t = {
				Z: {...k,nk: 0}
			};
			raw_result.forEach((d,i) =>{
				const g = {};
				result[0].forEach((e,f)=>{
					if(typeof e === 'string') g[e.replace(/^\d/igm,'')] = d[f];
				});
				g['nk'] = d[d.length-1];
				t[`s_${i}`] = g;
			});
			console.table(t);
		}
	};
}

function simplex(serialize_constrait,_objective,deb){

	const { raw_result: constrait } = serialize_constrait;
	const { result: objective } = _objective;

	// melakukan pengecekan apakah
	// fungsi tujuan sudah tidak memiliki nilai negatif
	// jika iya maka berhenti
	let check_objective = [...objective].sort((a,b)=> a - b);
	if(check_objective[0] >= 0) return;

	// memilih kolom kunci 
	let [[column,$1]] = objective.map((d,i)=> [i,d])
	.sort(([_,a],[$,b])=>{
		return a - b;
	});

	// mengambil nilai kolom
	const column_key = [objective[column]];
	for(let x of constrait){
		column_key.push(x[column]);
	}
	
	// memilih baris kunci
	if(objective[constrait[0].length-1] === void 0){
		constrait.unshift([...objective,0]);
	}
	else {
		constrait.unshift(objective);
	}
	const index = [];
	column_key.forEach((d,i)=>{
		index.push(constrait[i][constrait[i].length-1]/d);
	});
	let [[rows,$2]] = index.slice(1,index.length).map((d,i)=> [i,d])
	.sort(([_,a],[$,b])=>{
		return a - b;
	});

	// mengammbil nilai kunci
	let key_value = constrait[rows+1][column];

	// melakukan update
	// dengan formula 
	/**
	 * Baris kunci baru = Nilai Baris kunci lama / nilai kunci 
	 * Baris baru lain = Nilai Baris lama - (Nilai Baris Kunci baru * Angka Kolom kunci baris)
	 */
	
	if(deb) console.table(constrait);
	constrait[rows+1].forEach((d,i)=>{
		constrait[rows+1][i] = d / key_value;
	});

	constrait.forEach((d,i)=>{
		if(i !== rows + 1) d.forEach((e,f)=>{
			constrait[i][f] = e - (constrait[rows+1][f] * column_key[i]);
		});
	});
	if(deb) console.table(constrait);
	const results = simplex({
		raw_result: constrait.slice(1,constrait.length)
	},{
		result: constrait.slice(0,1)[0]
	},deb);

	return {
		results: constrait,
	}

}

const t = serialize_constrait([
	[3,4],
	[0,1],
	[2,2]
],[120,20,40]);
const objective = get_objective([30,40],t.shape);
t.debug(objective)
const y = simplex(t,objective,true);