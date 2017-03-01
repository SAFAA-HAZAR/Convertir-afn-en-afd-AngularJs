/******** struct of my principal objects ******/
function trans(from,to,alpha) {
	this.from=from;
	this.to=to;
	this.alpha=alpha;
}
function nfa(start,arrayFinate,arrayTransitions)
{
	this.states=getStatesFromTransitions(arrayTransitions);
	this.alphabets=getAlphabetsFromTransitions(arrayTransitions);
	this.transitions=arrayTransitions;
	this.finateStates=arrayFinate;
	this.startState=start;

	this.get_final_state = function(){

		return this.final_state;
	}
	this.display = function(){
		document.write("<br>transitions :<br>");
		for(i=0;i< this.transitions.length;i++){
			document.write("from : "+this.transitions[i].from+" to : "+this.transitions[i].to+" symbol : "+this.transitions[i].trans_symb+"<br>");
		}
		document.write("final_state = "+this.final_state+"<br>");
	}
}
function dfa()
{
	this.states=[];
	this.alphabets=[]; // à revoir
	this.transitions=[];
	this.finateStates=[];
	this.startState;
	this.display = function(){
		document.write("<br>transitions :<br>");
		for(var i in this.transitions){
			document.write("from : "+this.transitions[i].from.sub_states+" to : "+this.transitions[i].to+" symbol : "+this.transitions[i].alpha+"<br>");
		}
		//document.write("final_state = "+this.final_state+"<br>");
	}
}

function dfa_state(sub_states,marked,isFinate)
{
	this.sub_states=sub_states;
	this.marked=marked
	this.isFinate=isFinate;
}
/************** fin objects *****************/

/********* principal functions ***********/
function move_nfa(nfa,dfaState,alpha) // ret ["1","2"]
{
	var res=[];
	ds=dfaState.sub_states;		//console.log(ds);
	for(s in ds )
	{	
		var n=statesFromBy(ds[s],alpha,nfa);  //console.log(n);
		if(n.length>0)
		{
			for( i in n)
				if(res.indexOf(n[i])==-1)
					res.push(n[i]);
		}
	}
	return res;
}

/*****  final function ****************/


function NFAtoDFA1(nfa_input)
{
	DFA_res= new dfa();
	/******* first itération  ********/ 
	arg1=[];
	arg1.push(nfa_input.startState); //console.log(arg1);
	arg2 = 0;
	arg3= isFinateSet(nfa_input,arg1);	//console.log(arg3);
	init = new dfa_state(arg1,arg2,arg3); //console.log("init",init);
	DFA_res.states.push(init); //console.log("dfasae",DFA_res.states);
	/********  fin first iteration **********/
	while(containsUnmarked(DFA_res))
	{	 //document.write(containsUnmarked(DFA_res));
		T = firstUnmarkedState(DFA_res); //console.log("T",T);
		var ind = DFA_res.states.indexOf(T);//document.write(T)
		DFA_res.states[ind].marked=1;
		
		for(var a in nfa_input.alphabets)
		{	var S=[];
			
			var ss= move_nfa(nfa_input,T,nfa_input.alphabets[a]); //console.log("SS",ss)
			if(ss.length>0)
				for(var i in ss)
					S.push(ss[i]); // ["2","3"]
			
			 if( S.length>0  && !containsState(DFA_res,S) ) /* test if our new state is in dfa already !*/
			 {
			 	tmp=new dfa_state(S,0,isFinateSet(nfa_input,S)); //console.log("tmp",tmp);
				DFA_res.states.push(tmp); //console.log("push",S);//zntrz une fois a la boucle :p good
			}
			//console.log('unm',containsUnmarked(DFA_res));
			 //console.log("S",S);
			 if(S.length>0)
			 {
			 	tmp1 = new trans(T,S,nfa_input.alphabets[a]);
			 	DFA_res.transitions.push(tmp1);
			 }
		}
	}
	//DFA_res.display();
	
	DFA_res.alphabets= getAlphabetsFromTransitions(DFA_res.transitions);
	console.log(DFA_res.states);
	console.log(DFA_res.transitions);

	return DFA_res;
}

/*******  sub functions ************/

function getStatesFromTransitions(transitions)
{
	res=[]; //console.log(res);
	for(var t in transitions)
	{	//console.log(t);
		tmp1= transitions[t].from; //console.log(tmp1);
		tmp2= transitions[t].to;		//console.log(tmp2);
		if(res.indexOf(tmp1) == -1)
			{res.push(tmp1);	//console.log(res)
			}
		if(res.indexOf(tmp2) == -1)
			res.push(tmp2);
	}
	return res;
}
function getAlphabetsFromTransitions(transitions)
{
	res=[]; //console.log(res);
	for(var t in transitions)
	{	//console.log(t);
		tmp1= transitions[t].alpha; //console.log(tmp1);
				//console.log(tmp2);
		if(res.indexOf(tmp1) == -1)
			{res.push(tmp1);	//console.log(res)
			}
		
	} console.log("work fiiiiiiine sara now happy !")
	return res;	
}
function isFinateSet(nfa,sub_states)
{
	for(var i in sub_states)
	{
		if(nfa.finateStates.indexOf(sub_states[i])==0)
		{
			return 1;
		}

	}
	return 0;
}
function statesFromBy(s,alpha,nfa)
{
	res=[]; //console.log(res);
	for(var t in nfa.transitions)
		if(nfa.transitions[t].from==s && nfa.transitions[t].alpha==alpha && res.indexOf(nfa.transitions[t].to) == -1 )
			res.push(nfa.transitions[t].to);
	return res;	
}
function containsUnmarked(DFA)
{
	for(s in DFA.states)
	{	
		if(!DFA.states[s].marked)
		{
			return 1;
		}
	}
}
function firstUnmarkedState(DFA)
{
	for(s in DFA.states)
	{	
		if(!DFA.states[s].marked)
		{
			return DFA.states[s];
		}
	}	
}
function containsState(DFA,sub_state)
{
	arg1= sub_state.sort().join(','); //convert dfa_state to a sorted string to compare it with all the states in dfa
	n= DFA.states;  
	for(i in n)
	{	
		arg2= n[i].sub_states.sort().join(',');
		if(arg1==arg2)
		{
			return 1;
		}
	}
	return 0;
}

