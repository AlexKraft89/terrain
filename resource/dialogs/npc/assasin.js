dialog = {
	"step1":{
			"text":"Добро пожаловать в нашу деревню, ты был сильно пьян и навернео не чего не можешь вспомнить?",
			"answer":[
						{"answer":"Да я не чего не помню","fun":function(){}},
						{"answer":"Иди нахуй тебя это не должно волновать","fun":function(){}},
						{"answer":"До свиданья шенок","fun":function(){ GUI.dialog.openstep('step2'); }},
						{"answer":"Задания","fun":function(){ GUI.quest.GetCityQuest(5);  GUI.dialog.closedialog();},"color":"#F00"},
						{"answer":"Магазин","fun":function(){ GUI.sale.StartSaleFormBasicShop();  GUI.dialog.closedialog(); },"color":"#F00"}
						
					 ]
			},
	"step2":{
			"text":"До скорых встречь чувак",
			"answer":[
						{"answer":"пока","fun":function(){ GUI.dialog.closedialog(); }},
						{"answer":"назад","fun":function(){GUI.dialog.openstep('step1'); }}
					 ]
			}

}