function trans(from,to,trans_symb) {
	this.from=from;
	this.to=to;
	this.trans_symb=trans_symb;
}


function NFA_obj()
{
	this.vertex=[];
	this.transitions=[];
	this.final_state ;
	this.get_vertex_count = function(){
		return this.vertex.length;
	}
	this.set_vertex= function(n_vertex)
	{
		for(i=0;i<n_vertex;i++)
			this.vertex.push(i);
	}
	this.set_transition = function(vertex_from,vertex_to,trans_symb)
	{
		this.transitions.push(new trans(vertex_from,vertex_to,trans_symb));
	}
	this.set_final_state = function(fs){
		this.final_state = fs ;
	}
	this.get_final_state = function() {
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

/*****************		Concaténation     *********************************/

function concate(a,b)
{
	result=new NFA_obj();
	result.set_vertex(a.get_vertex_count()+b.get_vertex_count());
	new_trans = new trans();
	for(var i=0; i<a.transitions.length;i++)
	{
		new_trans= a.transitions[i];
		result.set_transition(new_trans.from, new_trans.to, new_trans.trans_symb);
	}
	result.set_transition(a.final_state, a.get_vertex_count(),"epsilon" );

	for(var i=0; i<b.transitions.length;i++)
	{
		new_trans= b.transitions[i];
		result.set_transition(new_trans.from+a.get_vertex_count(), new_trans.to+a.get_vertex_count(), new_trans.trans_symb);
	}

	result.set_final_state(a.get_vertex_count()+b.get_vertex_count()-1);
	return result ;
}

/****************************  kleen **********************************/
function kleen(a)
{
	result = new NFA_obj();
	result.set_vertex(a.get_vertex_count()+2);
	result.set_transition(0,1,"epsilon");

	for(var i=0;i<a.transitions.length;i++)
	{
		result.set_transition(
				a.transitions[i].from+1,
				a.transitions[i].to+1,
				a.transitions[i].trans_symb
			);
	}
	result.set_transition(a.get_vertex_count(),a.get_vertex_count()+1,"epsilon");
	result.set_transition(a.get_vertex_count(),1,"epsilon");
	result.set_transition(0,a.get_vertex_count()+1,"epsilon");
	result.set_final_state(a.get_vertex_count()+1);
	return result;
}

/*****************************  OR selection ******************************/

function or_selector(array)
{									
	result =new NFA_obj();
	var vertex_count=2;
	var n=array.length;
	for(var i=0;i<n;i++)
	{
		vertex_count +=array[i].get_vertex_count();
	}

	var begin_diag=1;
	for(var i=0;i<n;i++)
	{
		result.set_transition(0,begin_diag,"epsilon");
		tmp=array[i];
		for(var j=0;j<tmp.transitions.length;j++)
		{
			new_trans=tmp.transitions[j];
			result.set_transition(new_trans.from+begin_diag,new_trans.to+begin_diag,new_trans.trans_symb);
		}

		
		begin_diag +=tmp.vertex.length;
		result.set_transition(begin_diag-1,vertex_count-1,"epsilon");
	}
	result.set_final_state(vertex_count-1);
	return result;
}

/***************  full algo RE to NFA ******************************/

function ReToNfa(re)
{
	operators= [];
	operands=[];


	for(var i=0;i<re.length;i++)
	{
		cur_sym = re.charAt(i);
		if(cur_sym != '(' && cur_sym != ')' && cur_sym != '*' && cur_sym != '|' && cur_sym != '.')
		{
			operands.push(little_nfa(cur_sym));
		}
		else if(cur_sym=='*')
		{
			start_op=operands.pop();
			operands.push(kleen(start_op));
		}
		else if(cur_sym=='|')
		{
			operators.push(cur_sym);
		}
		else if (cur_sym=='.')
		{
			operators.push(cur_sym);
		}
		else if(cur_sym=='(')
		{
			operators.push(cur_sym);
		}
		else
		{	
			o_count=operators.length - operators.lastIndexOf("(")-1; //console.log(o_count);
				o_symb=operators.pop();
				if(o_symb=="(")
					continue;
				
			for(var j=1;j<=o_count;j++)
			{	//console.log(" "+j+" "+operands);
				//console.log("operators"+operators);
				
				if(o_symb=='.')
				{
					op1=operands[operands.length-1]; //op1.display();
					operands.pop(); 
					op2=operands[operands.length-1]; //op2.display();
					operands.pop(); 
					operands.push(concate(op2,op1)); //console.log("in if :"+operands);
				}
				else if(o_symb=='|')
				{
					local_opt=[];
					var k=o_count-1;
					local_opt.push(operands.pop());
					local_opt.push(operands.pop());
					while(operators[k]=='|')
					{	console.log(operators[k])
						//local_opt.push(operators[k]);
						  local_opt.push(operands.pop());console.log(local_opt);  console.log(operands);console.log(operators);
						  operators.pop();
						  k--; console.log("k "+k);
					}
					

					operands.push(or_selector(local_opt.reverse()));
					// console.log(operands);
					// operands.push(little_nfa("g"));console.log(operands);
				}
				o_symb=operators.pop(); 
			}
		}
	}
	console.log(operands);
	return operands[operands.length-1];
}
ReToNfa("(a|b)").display(); 
console.log("greaaaaaaaaaaattt !!")
/***********************    construction NFA    **********************************/

function little_nfa(a)
{
	new_nfa = new NFA_obj();
	new_nfa.set_vertex(2);
	new_nfa.set_transition(0,1,a.toString());
	new_nfa.set_final_state(1);
	return new_nfa ;
}

//////////////////:::: little test :::://////////
// var a="a";
// na=little_nfa(a);
//kleen(na).display();			

// var b="b";
// nb=little_nfa(b);
// nb.display();


// ab=concate(na,nb);
// ab.display();

// // nc=kleen(little_nfa("c")).display();
// var arr= [];
// arr.push(na); ;
// arr.push(nb); 

// nn=or_selector(arr);

// nn.display();







//////////////////:::::



// just fortest i am using a new keyboard nanana 
function sarah(allah,code)
{
	allah=1;
	while(allah)
	{
		beHayypy(code);
	}
}

// nn=new NFA_obj();

// console.log(nn.get_vertex_count());
// nn.set_transition("a","b",12);
// nn.set_final_state("a");
// nn.display();

// console.log("vertex  "+nn.vertex);
// console.log("transition  "+nn.transitions);
// console.log("final state  "+nn.final_state);





