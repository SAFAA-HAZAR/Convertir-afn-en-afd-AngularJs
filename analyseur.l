%{ 
#include <stdio.h>
#include "analyseur.h"
#define debug true
%}


%option noyywrap

%%
[\n]                     {if (debug){ printf("%s ",yytext);return rt_ligne;}}
[ ]                        {if (debug){ printf(" ");         return ESPACE;}}
[0-9]+                     {if (debug){printf("%s ",yytext); return NOMBRE;}}
"int"                      {if (debug){printf("%s ",yytext); return INT;}}
"bool"                     {if (debug){printf("%s ",yytext); return BOOL;}}
"true"                     {if (debug){printf("%s ",yytext); return TRUE;}}
"begin"                    {if (debug){printf("%s ",yytext); return begin; }}
"end"                      {if (debug){printf("%s ",yytext); return END; }}
"if"                       {if (debug){printf("%s ",yytext); return IF; }}
"then"                     {if (debug){printf("%s ",yytext); return THEN; }}
"endif"                    {if (debug){printf("%s ",yytext); return ENDIF; }}
"else"                     {if (debug){printf("%s ",yytext); return ELSE; }}
"false"                    {if (debug){printf("%s ",yytext); return FALSE;}}
[a-zA-Z]*                  {if (debug){printf("%s ",yytext); return Text;}}
"="                        {if (debug){printf("%s ",yytext); return EGALE;}}
";"                        {if (debug){printf("%s ",yytext); return DEL; }}
"+"                        {if (debug){printf("%s ",yytext); return PLUS; }}
"("                        {if (debug){printf("%s ",yytext); return OUV; }}
")"                        {if (debug){printf("%s ",yytext); return FER; }}	
%%

//--------tester si un token est de type "int" ou "bool"-------------------------------------------------------------------------------------------------------------//

bool isType(tokensType token){
if (token==INT || token==BOOL){return true;}
else{return false;}
}
//--------tester si un token est type "false" ou"true"ou "nombre"----------------------------------------------------------------------------------------------------//
bool isConst(tokensType token){
if(token==FALSE || token==TRUE ||token==NOMBRE){return true;}
else{return false;}
}
//--------fonction qui traite l'instruction "x=3;" de type "Text Espace Egale Espace Nombre Espace Point-virgule-----------------------------------------------------//
bool isInstruction0(){


         if(token==Text) {
                token=(tokensType) yylex();

                if(token==ESPACE){ 
                token=(tokensType) yylex();
                                         if(token==EGALE){      token=(tokensType) yylex(); 
                                                                if(token==ESPACE){
                                                                            token=(tokensType) yylex(); 
                                                                             if(token==NOMBRE){
                                                                                   token=(tokensType) yylex(); 
                                                                                   if(token==ESPACE){
                                                                                           token=(tokensType) yylex(); 
                                                                                                 if(token==DEL){return true;}
                                                                                                 else{return false;}
                                                                                   }
                                                                                   else{return false;}


                                                                             }
                                                                             else{return false;}
                                                                }
                                                                else{return false;}
                                                           }
                                         else{return false;} 
                } else{return false;}

        }
	else return false;

	}



//----------------------fonction qui traite l'instruction "x=3+y;" de type "Text Espace Egale Espace Nombre Espace plus espace Text espace point-virgule ----------//  

bool isInstruction1(){
         if(token==Text) {
                token=(tokensType) yylex();

                if(token==ESPACE){ 
                token=(tokensType) yylex();
                                         if(token==EGALE){      token=(tokensType) yylex(); 
                                                                if(token==ESPACE){
                                                                            token=(tokensType) yylex(); 
                                                                             if(token==NOMBRE){
                                                                                   token=(tokensType) yylex(); 
                                                                                   if(token==ESPACE){
                                                                                           token=(tokensType) yylex(); 
                                                                                                 if(token==PLUS){ 
                                                                                                    token=(tokensType) yylex(); 
                                                                                                               if(token==ESPACE){
                                                                                                                  token=(tokensType) yylex();

                                                                                                                             if(token==Text){
                                                                                                                               token=(tokensType) yylex();
                                                                                                                                if(token==ESPACE){
                                                                                                                                 token=(tokensType) yylex();
                                                                                                                                    if(token==DEL){return true;}
                                                                                                                                else{return false;}
                                                                                                                              }
                                                                                                                                  else{return false;}
                                                                                                                                 }                          
                                                                                                                          else{return false;}                          
                                                                                                               }
                                                                                                               else{return false;}                                     
                                                                                                 }
                                                                                                 else{return false;}
                                                                                   }
                                                                                   else{return false;}
                                                                             }
                                                                             else{return false;}
                                                                }
                                                                else{return false;}
                                                           }
                                         else{return false;} 
                } else{return false;}
        }
	else return false;
	}
 //----------------------------------------------------fonction qui traite l'instruction "t=(3+y)+z;" -------------------------------------------------------------//  

bool isInstruction2(){
         if(token==Text) {
                token=(tokensType) yylex();
                if(token==ESPACE){ 
                token=(tokensType) yylex();
                                         if(token==EGALE){      token=(tokensType) yylex(); 
                                                                if(token==OUV){
                                                                            token=(tokensType) yylex(); 
                                                                             if(token==ESPACE){
                                                                                   token=(tokensType) yylex(); 
                                                                                   if(token==NOMBRE){
                                                                                           token=(tokensType) yylex(); 
                                                                                                 if(token==ESPACE){ 
                                                                                                 token=(tokensType) yylex();
                                                                                                   if(token==PLUS){
                                                                                                      token=(tokensType) yylex();
                                                                                                               if(token==ESPACE){
                                                                                                                 token=(tokensType) yylex();
                                                                                                                    if(token==Text){
                                                                                                                        token=(tokensType) yylex();
                                                                                                                           if(token==FER){
                                                                                                                                 token=(tokensType) yylex();
                                                                                                                                    if(token==ESPACE){
                                                                                                                                           token=(tokensType) yylex();
                                                                                                                                                  if(token==PLUS){
                                                                                                                                           token=(tokensType) yylex();
                                                                                                                                                  if(token==ESPACE){
                                                                                                                                           token=(tokensType) yylex();
                                                                                                                                                  if(token==Text){
                                                                                                                                           token=(tokensType) yylex();
                                                                                                                                                  if(token==DEL){
                                                                                                                                                  return true;
                                                                                                                                                  }
                                                                                                                                           else{return false;}
                                                                                                                                         }
                                                                                                                                           else{return false;}
                                                                                                                                         }	
                                                                                                                                           else{return false;}
                                                                                                                                       }
                                                                                                                                           else{return false;}
                                                                                                                                    }
                                                                                                                                    else{return false;}
                                                                                                                           }
                                                                                                                           else{return false;}
                                                                                                                    } 
                                                                                                                    else{return false;}
                                                                                                               }
                                                                                                               else{return false;}

                                                                                                  }
                                                                                                   else{return false;}
                                                                                                  }                                                                                                
                                                                                                 else{return false;}
                                                                                   }
                                                                                   else{return false;}
                                                                             }
                                                                             else{return false;}
                                                                }
                                                                else{return false;}
                                                           }
                                         else{return false;} 
                } else{return false;}
        }
	else return false;

	}


 //----------------------------------------------------fonction qui traite une declaration de variable------------------------------------------------------------//  




bool isDeclaration(){
    

    if (isType(token)){
                token=(tokensType) yylex();
        if(token==ESPACE){ 
                token=(tokensType) yylex();
         if(token==Text) {
                token=(tokensType) yylex();

                if(token==ESPACE){ 
                token=(tokensType) yylex();
                                         if(token==EGALE){      token=(tokensType) yylex(); 
                                                                if(token==ESPACE){
                                                                            token=(tokensType) yylex(); 
                                                                             if(token==NOMBRE){
                                                                                   token=(tokensType) yylex(); 
                                                                                   if(token==ESPACE){
                                                                                           token=(tokensType) yylex(); 
                                                                                                 if(token==DEL){return true;}
                                                                                                 else{return false;}
                                                                                   }
                                                                                   else{return false;}


                                                                             }
                                                                             else{return false;}
                                                                }
                                                                else{return false;}
                                                           }
                                         else{return false;} 
                } else{return false;}

        }
	else return false;

	     }
	else return false;

      }
	else return false;

	}

 //----------------------------------------------------fonction qui traite la fonction-----------------------------------------------------------------------------//  

//int x=8;
//begin
//x=3;
///if (x==10)then 
//x=8;
//endif
//endif
//end

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//

bool fctFCT(){
 
     if(isDeclaration()==true)
              {
      token=(tokensType) yylex();     
             if(token==rt_ligne) 
            {
                      token=(tokensType) yylex();     
                      if(token==begin){
                                     token=(tokensType) yylex();  
                                      if(token==rt_ligne){
                                                token=(tokensType) yylex();
                                                   if(isInstruction0()==true){
                                                     token=(tokensType) yylex();
                                                       if(token==rt_ligne){
                                                            token=(tokensType) yylex(); 
                                                              if(token==IF){
                                                                  token=(tokensType) yylex(); 
                                                                     if(token==ESPACE){
                                                                        token=(tokensType) yylex(); 
                                                                           if(token==OUV){
                                                                               token=(tokensType) yylex();
                                                                                    if(token==Text){ 
                                                                                     token=(tokensType) yylex();
                                                                                          if(token==EGALE){
                                                                                        token=(tokensType) yylex();
                                                                                          if(token==EGALE){
                                                                                          token=(tokensType) yylex();
                                                                                              if(token==NOMBRE){
                                                                                              token=(tokensType) yylex();
                                                                                                  if(token==FER){
                                                                                                   token=(tokensType) yylex();
                                                                                                     if(token==THEN){
                                                                                                      token=(tokensType) yylex();
                                                                                                      
                                                                                                        if(token==rt_ligne){
                                                                                                          token=(tokensType) yylex();
                                                                                                            if(isInstruction0()==true){
                                                                                                             token=(tokensType) yylex();
                                                                                                              if(token==rt_ligne){
                                                                                                               token=(tokensType) yylex();
                                                                                                                 if(token==ENDIF){ 
                                                                                                               token=(tokensType) yylex();
                                                                                                                if(token==rt_ligne){
                                                                                                               token=(tokensType) yylex();
                                                                                                                 if(token==END){
                                                                                                                  return true;
                                                                                                                  }
                                                                                                             else{return false;}
                                                                                                                }
                                                                                                        
                                                                                                        else{return false;}
                                                                                                            
                                                                                                         }
                                                                                                        
                                                                                                        else{return false;}
                                                                                                            }
                                                                                                      else{return false;}
                                                                                                        }
                                                                                                      else{return false;}
                                                                                                        }
                                                                                                      else{return false;}
                                                                                                    }
                                                                                                    else{return false;}
                                                                                                }

                                                                                             else{return false;}
                                                                                             }
                                                                                             else{return false;}
                                                                                           }
                                                                                          else{return false;}
                                                                                          }
                                                                                          else{return false;}
                                                                                    }     

                                                                                else{return false;}
                                                                          }
                                                                          else{return false;}
                                                            }
                                                             else{return false;}
                                                       }
                                                          else{return false;}
                                                     }
                                                       else{return false;}
                                                   }
                                                   else{ return false;}

                                      }
                                      else{return false;}

                      }
                      else{return false;}
            }
         }
       else {return false;}
}

//-------------------------------------------------------------------------------main()------------------------------------------------------------------------------//

int main(void){
printf("-------welcome user!-------\n");
printf("starting.... \n");
printf("the stage is your's...\n");
token=(tokensType)yylex();
if(isInstruction0()==true) printf("\n User:great job! :)\n");
else printf (" \n User:no!try again:! this is an instruction_0! :( \n");
 

printf("-------------------------------------------------------\n");
 
if(isInstruction1()==true) printf("\n User:great job! :)\n");
else printf (" \n User:no!try again:! this is an instruction_1! :( \n");
printf("-------------------------------------------------------\n");
 

 
if(isInstruction2()==true) printf("\n User:great job! :)\n");
else printf (" \n User:no!try again:! this is an instruction_2! :( \n");
printf("-------------------------------------------------------\n");
 

 
if(isDeclaration()==true) printf("\n User:great job! :)\n");
else printf (" \n User:no!try again:! this is a declaration! :( \n");
printf("-------------------------------------------------------\n");
 

 
if(fctFCT()==true) printf("\n User:great job! :)\n");
else printf (" \n User:no!try again:! this is a for-function! :( \n");
printf("--------Goodbye!-----------\n\n");
return 0;
}
//----------------------------------------------------------------------------------THe _end------------------------------------------------------------------------//






