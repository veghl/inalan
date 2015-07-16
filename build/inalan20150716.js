/*
*
* Copyright (c) 2015- Ladislav Vegh, Komarno, Slovakia
*
* Distributed under the terms of the MIT license.
* http://www.opensource.org/licenses/mit-license.html
*
* This notice shall be included in all copies or substantial portions of the Software.
*
*/
var inalan=inalan||{};inalan.Stage=function(b){document.onselectstart=function(){return false};this.canvas=document.getElementById("myCanvas");this.canvas.parent=this;this.ctx=this.canvas.getContext("2d");this.visuItems={};this.vars={};this.controller=new inalan.Controller();this.controller.x=30;this.controller.y=this.ctx.canvas.height-35;this.controller.ctx=this.ctx;this.canvas.addEventListener("mousemove",this.stageMouseMoveEvent);this.canvas.addEventListener("mousedown",this.stageMouseDownEvent);this.canvas.addEventListener("mouseout",this.stageMouseUpOrOutEvent);this.canvas.addEventListener("mouseup",this.stageMouseUpOrOutEvent);var a=this;this.fps=24;this.render=function(c){a.ctx.clearRect(0,0,a.canvas.width,a.canvas.height);a.controller.render();for(var d in a.visuItems){if(a.visuItems.hasOwnProperty(d)){a.visuItems[d].render()}}for(var d in a.visuItems){if(a.visuItems.hasOwnProperty(d)){if(a.visuItems[d] instanceof inalan.VisuVariable||a.visuItems[d] instanceof inalan.VisuArray){a.visuItems[d].renderCopy()}}}if(a.showArrow.length>0){a.ctx.fillStyle="#055";a.ctx.globalAlpha=0.1;for(var e=0;e<a.showArrow.length/4;e++){var g=Math.atan2(a.showArrow[e*4+3]-a.showArrow[e*4+1],a.showArrow[e*4+2]-a.showArrow[e*4]);var f=Math.sqrt(Math.pow(a.showArrow[e*4]-a.showArrow[e*4+2],2)+Math.pow(a.showArrow[e*4+1]-a.showArrow[e*4+3],2))+1;a.ctx.save();a.ctx.translate(a.showArrow[e*4+0],a.showArrow[e*4+1]);a.ctx.rotate(Math.PI+g);a.ctx.beginPath();a.ctx.moveTo(0,-10);a.ctx.lineTo(0,+10);a.ctx.lineTo(-f+20,+10);a.ctx.lineTo(-f+20,+20);a.ctx.lineTo(-f,0);a.ctx.lineTo(-f+20,-20);a.ctx.lineTo(-f+20,-10);a.ctx.lineTo(0,-10);a.ctx.fill();a.ctx.restore()}a.ctx.globalAlpha=1}};setInterval(this.render,1000/this.fps);this.showArrow=[];this.animating=0;this.time=1000};inalan.Stage.prototype.stageMouseMoveEvent=function(l){var h=l.target.getBoundingClientRect();var c=l.clientX-h.left;var a=l.clientY-h.top;var g=l.target.parent;var k=false;if(l.which==1){for(var e in g.controller){if(g.controller.hasOwnProperty(e)){var b=g.controller[e];if(b instanceof inalan.VisuScrollbar){if(b.dragging){var j=b.min+(c-(b.x-b.width/2+10))*(b.max-b.min+1)/(b.width-20);if(j<b.min){j=b.min}if(j>b.max){j=b.max}if(b.position!=j){b.position=j;b.onChange(j)}k=true}}}}for(var f in g.visuItems){if(g.visuItems.hasOwnProperty(f)){var d=g.visuItems[f];if(d instanceof inalan.VisuVariable){if(d.dragging){if(d.changable){d.value=d.y-a;k=true}else{d.dragging=false}}}if(d instanceof inalan.VisuArray){for(var e=0;e<d.items.length;e++){if(d.items[e].dragging){if(d.items[e].changable){d.items[e].value=d.items[e].y-a;k=true}else{d.items[e].dragging=false}}}}if(d instanceof inalan.VisuScrollbar){if(d.dragging){var j=d.min+(c-(d.x-d.width/2+10))*(d.max-d.min+1)/(d.width-20);if(j<d.min){j=d.min}if(j>d.max){j=d.max}if(d.position!=j){d.position=j;d.onChange(j)}k=true}}}}}if(!k){var m="default";for(var e in g.controller){if(g.controller.hasOwnProperty(e)){var b=g.controller[e];if(b instanceof inalan.VisuButton){if(b.isOver(c,a)&&b.enabled){b.color=b.overColor;m="pointer"}else{b.color=b.defaultColor}}if(b instanceof inalan.VisuScrollbar){if(b.isOver(c,a)&&b.enabled){b.color=b.overColor;m="pointer"}else{b.color=b.defaultColor}}}}for(var f in g.visuItems){if(g.visuItems.hasOwnProperty(f)){var d=g.visuItems[f];if(d instanceof inalan.VisuVariable){if(d.changable&&d.isOver(c,a)){m="ns-resize"}}if(d instanceof inalan.VisuArray){for(var e=0;e<d.items.length;e++){if(d.items[e].changable&&d.items[e].isOver(c,a)){m="ns-resize"}}}if(d instanceof inalan.VisuButton&&d.enabled){if(d.isOver(c,a)){d.color=d.overColor;m="pointer"}else{d.color=d.defaultColor}}if(d instanceof inalan.VisuScrollbar&&d.enabled){if(d.isOver(c,a)){d.color=d.overColor;m="pointer"}else{d.color=d.defaultColor}}}}l.target.style.cursor=m}};inalan.Stage.prototype.stageMouseDownEvent=function(j){if(j.which==1){var h=j.target.getBoundingClientRect();var c=j.clientX-h.left;var a=j.clientY-h.top;var g=j.target.parent;for(var e in g.controller){if(g.controller.hasOwnProperty(e)){var b=g.controller[e];if(b instanceof inalan.VisuButton){if(b.isOver(c,a)&&b.enabled){b.pressed=true}}if(b instanceof inalan.VisuScrollbar){if(b.isOver(c,a)){b.dragging=true}}}}for(var f in g.visuItems){if(g.visuItems.hasOwnProperty(f)){var d=g.visuItems[f];if(d instanceof inalan.VisuVariable){if(d.changable&&d.isOver(c,a)){d.dragging=true}}if(d instanceof inalan.VisuArray){for(var e=0;e<d.items.length;e++){if(d.items[e].changable&&d.items[e].isOver(c,a)){d.items[e].dragging=true}}}if(d instanceof inalan.VisuButton&&d.enabled){if(d.isOver(c,a)){d.pressed=true}}if(d instanceof inalan.VisuScrollbar){if(d.isOver(c,a)){d.dragging=true}}}}}};inalan.Stage.prototype.stageMouseUpOrOutEvent=function(j){if(j.type=="mouseout"||j.which==1){var h=j.target.getBoundingClientRect();var c=j.clientX-h.left;var a=j.clientY-h.top;var g=j.target.parent;for(var e in g.controller){if(g.controller.hasOwnProperty(e)){var b=g.controller[e];if(b instanceof inalan.VisuButton){if(b.isOver(c,a)&&b.enabled&&b.pressed){b.onClickFnc()}b.pressed=false}if(b instanceof inalan.VisuScrollbar){b.dragging=false}}}for(var f in g.visuItems){if(g.visuItems.hasOwnProperty(f)){var d=g.visuItems[f];if(d instanceof inalan.VisuVariable){d.dragging=false}if(d instanceof inalan.VisuArray){for(var e=0;e<d.items.length;e++){d.items[e].dragging=false}}if(d instanceof inalan.VisuButton){if(d.isOver(c,a)&&d.enabled&&d.pressed){d.onClickFnc()}d.pressed=false}if(d instanceof inalan.VisuScrollbar){d.dragging=false}}}}};inalan.Stage.prototype.addVisu=function(a,b){if(typeof(this.visuItems[b])!="undefined"){throw"- Can not add '"+b+"' to the stage, object with this ID already exists on the stage."}else{if(typeof(a.id)!="undefined"){throw"- This object was probably already added to the stage with ID: "+a.id+"."}}a.ctx=this.ctx;a.id=b;this.visuItems[b]=a};inalan.Stage.prototype.setSteps=function(a){this.controller.setSteps(a)};inalan.Stage.prototype.showAllButtons=function(){this.controller.showAllButtons()};inalan.Stage.prototype.get=function(a){return this.visuItems[a]};inalan.Stage.prototype.compare=function(c,a){c.startComparing();a.startComparing();var b=this};inalan.Stage.prototype.copy=function(f,a){this.animating++;f.changable=false;a.changable=false;var g=this;var b=Math.sqrt(Math.pow(f.x-a.x,2)+Math.pow(f.y-a.y,2));var e=b*this.time/100;var d=this.fps;var h=Math.floor(e*d/1000);var k=setInterval(function(){c()},1000/d);var m=(a.x-f.x)/h;var l=(a.y-f.y)/h;var j=f.x;var i=f.y;f.startCopying();f.setLightYellowColor();var c=function(){h--;if(h>0){f.copyx+=m;f.copyy+=l}else{if(h<=0){f.copyx=a.x;f.copyy=a.y;a.value=f.value;clearInterval(k);g.animating--;g.showArrow=g.showArrow.concat([f.x,f.y-f.value/2,a.x,a.y-a.value/2])}}}};inalan.Stage.prototype.move=function(f,a){this.animating++;f.changable=false;a.changable=false;var g=this;var b=Math.sqrt(Math.pow(f.x-a.x,2)+Math.pow(f.y-a.y,2));var e=b*this.time/100;var d=this.fps;var h=Math.floor(e*d/1000);var k=setInterval(function(){c()},1000/d);var m=(a.x-f.x)/h;var l=(a.y-f.y)/h;var j=f.x;var i=f.y;f.setGrayColor();f.startCopying();var c=function(){h--;if(h>0){f.copyx+=m;f.copyy+=l}else{if(h<=0){f.copyx=a.x;f.copyy=a.y;a.value=f.value;clearInterval(k);g.animating--;g.showArrow=g.showArrow.concat([f.x,f.y-f.value/2,a.x,a.y-a.value/2])}}}};inalan.Stage.prototype.exchange=function(h,a){this.animating++;h.changable=false;a.changable=false;var i=this;var c=Math.sqrt(Math.pow(h.x-a.x,2)+Math.pow(h.y-a.y,2));var g=c*this.time/100;var f=this.fps;var j=Math.floor(g*f/1000);var m=setInterval(function(){d()},1000/f);var o=(a.x-h.x)/j;var n=(a.y-h.y)/j;var e=h.x;var l=h.y;var b=a.x;var k=a.y;h.startCopying();a.startCopying();h.setHiddenColor();a.setHiddenColor();var d=function(){j--;if(j>0){h.copyx+=o;h.copyy+=n;a.copyx-=o;a.copyy-=n}else{if(j<=0){var p=a.value;a.value=h.value;h.value=p;h.copyx=h.x;h.copyy=h.y;a.copyx=a.x;a.copyy=a.y;clearInterval(m);i.animating--;if(a.value>h.value){var q=a.value/2;i.showArrow=i.showArrow.concat([h.x,h.y-q-16,a.x,a.y-q-16]);i.showArrow=i.showArrow.concat([a.x,a.y-q+16,h.x,h.y-q+16])}else{var q=h.value/2;i.showArrow=i.showArrow.concat([h.x,h.y-q+16,a.x,a.y-q+16]);i.showArrow=i.showArrow.concat([a.x,a.y-q-16,h.x,h.y-q-16])}}}}};inalan.Stage.prototype.add=function(e,a){this.animating++;e.changable=false;a.changable=false;var f=this;var b=Math.sqrt(Math.pow(e.x-a.x,2)+Math.pow(e.y-(a.y-a.value),2));var d=b*this.time/100;var c=this.fps;var h=Math.floor(d*c/1000);var k=setInterval(function(){g()},1000/c);var m=(a.x-e.x)/h;var l=(a.y-e.y-a.value)/h;var j=e.x;var i=e.y;e.startCopying();e.setLightYellowColor();var g=function(){h--;if(h>0){e.copyx+=m;e.copyy+=l}else{if(h<=0){e.copyx=a.x;e.copyy=a.y-a.value;a.value=a.value+e.value;clearInterval(k);f.animating--;f.showArrow=f.showArrow.concat([e.x,e.y-e.value/2,a.x,(a.y-a.value)+e.value/2])}}}};inalan.Stage.prototype.stopCopyingAndComparing=function(){for(var a in this.visuItems){if(this.visuItems.hasOwnProperty(a)){var c=this.visuItems[a];if(c instanceof inalan.VisuVariable){if(c.copy){c.stopCopying()}if(c.compare){c.stopComparing()}}if(c instanceof inalan.VisuArray){for(var b=0;b<c.items.length;b++){if(c.items[b].copy){c.items[b].stopCopying()}if(c.items[b].compare){c.items[b].stopComparing()}}}}}};var inalan=inalan||{};inalan.Controller=function(){this.x=0;this.y=0;this.fncIndex=0;this.fncRepeatIndex=0;this.stepFncsArray=null;this.playingAnimation=false;this.waitingAnimation=false;this.nextStepAuto=-1;this.undo=[];var k=this;this.resetLabel="Reset";this.startLabel="Start";this.stopLabel="Stop";this.prevLabel="Previous step";this.nextLabel="Next step";this.speedLabel="Speed of animation:";var b=function(n){var o=k.ctx.canvas.parent;var m=function(t,s){for(var r in t){if(typeof(t[r])==="object"){if(t[r] instanceof Array){s[r]=t[r]}else{if(!s.hasOwnProperty(r)){s[r]={}}m(t[r],s[r])}}else{s[r]=t[r]}}};var p=function(t,s){for(var r in s){if(typeof(s[r])==="object"&&t.hasOwnProperty(r)){p(t[r],s[r])}else{if(!t.hasOwnProperty(r)){delete s[r]}}}};var q=JSON.parse(k.undo[n][1]);m(q,o.vars);p(q,o.vars);var l=JSON.parse(k.undo[n][2]);m(l,o.visuItems);p(l,o.visuItems);k.fncIndex=k.undo[n][3];k.fncRepeatIndex=k.undo[n][4];o.showArrow=JSON.parse(k.undo[n][5])};var g=false;var f=function(){var l=k.ctx.canvas.parent;if(l.animating==0&&!k.waitingAnimation){g=false;k.playingAnimation=false;k.nextStepAuto=-1;k.startStop.text=k.startLabel;b(0);k.undo=[];k.reset.enabled=false;k.startStop.enabled=true;k.prevStep.enabled=false;k.nextStep.enabled=true}else{if(l.animating>0||k.waitingAnimation){g=true}}};var i=function(){var l=k.ctx.canvas.parent;if(l.animating==0&&!k.waitingAnimation){var m=k.undo.length-1;b(m);k.undo=k.undo.slice(0,m);if(k.undo.length==0){k.reset.enabled=false;k.prevStep.enabled=false}k.startStop.enabled=true;k.nextStep.enabled=true}};var a=function(){var l=k.ctx.canvas.parent;if(!k.playingAnimation){k.playingAnimation=true;k.startStop.text=k.stopLabel;k.prevStep.enabled=false;k.nextStep.enabled=false;if(l.animating==0){d()}}else{k.playingAnimation=false;k.startStop.text=k.startLabel;if(k.undo.length>0){k.prevStep.enabled=true}k.nextStep.enabled=true}};var j=function(){k.waitingAnimation=false;if(g){f()}else{if(k.playingAnimation||k.nextStepAuto>0){d()}}};var e;var h=function(){var l=k.ctx.canvas.parent;if(l.animating==0&&!k.waitingAnimation){clearInterval(e);if(g){f()}else{if(k.nextStepAuto==0){d()}else{if(k.nextStepAuto>0){k.waitingAnimation=true;setTimeout(j,l.time/1000*k.nextStepAuto)}else{if(k.playingAnimation){k.waitingAnimation=true;setTimeout(j,l.time)}}}}}};var d=function(){var l=k.ctx.canvas.parent;if(l.animating==0&&!k.waitingAnimation&&k.stepFncsArray!=null){if(k.nextStepAuto<0){k.reset.enabled=true;if(!k.playingAnimation){k.prevStep.enabled=true}var m=k.undo.length;k.undo[m]=new Array();k.undo[m][1]=JSON.stringify(l.vars);k.undo[m][2]=JSON.stringify(l.visuItems);k.undo[m][3]=k.fncIndex;k.undo[m][4]=k.fncRepeatIndex;k.undo[m][5]=JSON.stringify(l.showArrow)}l.showArrow=[];l.stopCopyingAndComparing();if(k.stepFncsArray[k.fncIndex] instanceof Array){k.nextStepAuto=k.stepFncsArray[k.fncIndex][k.fncRepeatIndex]();if(typeof(k.nextStepAuto)=="undefined"){k.nextStepAuto=-1}k.fncRepeatIndex++;if(k.fncRepeatIndex>=k.stepFncsArray[k.fncIndex].length){k.fncRepeatIndex=0;if(!k.stepFncsArray[k.fncIndex+1]()){k.fncIndex=k.fncIndex+2;if(k.fncIndex>=k.stepFncsArray.length){k.nextStepAuto=-1;k.playingAnimation=false;k.nextStep.enabled=false;k.startStop.enabled=false}}}}else{k.nextStepAuto=k.stepFncsArray[k.fncIndex]();if(typeof(k.nextStepAuto)=="undefined"){k.nextStepAuto=-1}k.fncIndex++;if(k.fncIndex>=k.stepFncsArray.length){k.nextStepAuto=-1;k.playingAnimation=false;if(k.undo.length>0){k.prevStep.enabled=true}k.nextStep.enabled=false;k.startStop.enabled=false;k.startStop.text=k.startLabel}}e=setInterval(h,1)}};var c=function(l){var m=k.ctx.canvas.parent;m.time=2000-l};this.reset=new inalan.VisuButton(this.resetLabel,70,f);this.prevStep=new inalan.VisuButton(this.prevLabel,120,i);this.startStop=new inalan.VisuButton(this.startLabel,0,a);this.nextStep=new inalan.VisuButton(this.nextLabel,100,d);this.reset.enabled=false;this.prevStep.enabled=false;this.speed=new inalan.VisuScrollbar(this.speedLabel,150,200,1800,1000,c)};inalan.Controller.prototype.showAllButtons=function(){this.reset.width=70;this.startStop.width=70;this.prevStep.width=120;this.nextStep.width=100;this.speed.width=150};inalan.Controller.prototype.render=function(){this.ctx.beginPath();this.ctx.strokeStyle="#000";this.ctx.moveTo(0,this.y-40+0.5);this.ctx.lineTo(this.ctx.canvas.clientWidth,this.y-40+0.5);this.ctx.stroke();var a=0;if(this.reset.width>0){this.reset.ctx=this.ctx;this.reset.x=this.x+this.reset.width/2;this.reset.y=this.y;this.reset.render();a+=20}if(this.startStop.width>0){this.startStop.ctx=this.ctx;this.startStop.x=this.x+this.reset.width+this.startStop.width/2+a;this.startStop.y=this.y;this.startStop.render();a+=20}if(this.prevStep.width>0){this.prevStep.ctx=this.ctx;this.prevStep.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width/2+a;this.prevStep.y=this.y;this.prevStep.render()}if(this.nextStep.width>0){this.nextStep.ctx=this.ctx;this.nextStep.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width+this.nextStep.width/2+a;this.nextStep.y=this.y;this.nextStep.render()}if(this.speed.width>0){this.speed.ctx=this.ctx;this.speed.x=this.x+this.reset.width+this.startStop.width+this.prevStep.width+this.nextStep.width+30+this.speed.width/2+a;this.speed.y=this.y;this.speed.render()}};inalan.Controller.prototype.setSteps=function(a){this.stepFncsArray=a};var inalan=inalan||{};inalan.VisuData=function(){this.x=0;this.y=0};var inalan=inalan||{};inalan.VisuVariable=function(a,b,c){if(typeof(c)=="undefined"){c=false}inalan.VisuData.call(this);this.name=a;if(b<0){throw"- the value of '"+a+"' must be >= 0"}this.value=b;this.minValue=0;this.maxValue=b>180?b:180;this.fillColor="#C00";this.strokeColor="#000";this.width=24;this.textRotation=0;this.changable=c;this.dragging=false;this.copy=false;this.copyx=0;this.copyy=0;this.compare=false;this.defaultColor="#C00";this.yellowColor="#FF2";this.lightYellowColor="#FFD";this.greenColor="#090";this.grayColor="#CCC";this.hiddenColor="#EEE";this.originalFillColor="#C00";this.originalStrokeColor="#000"};inalan.VisuVariable.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuVariable.prototype.constructor=inalan.VisuVariable;inalan.VisuVariable.prototype.randomize=function(b,a){if(typeof(b)=="undefined"||b<this.minValue){b=this.minValue}if(typeof(a)=="undefined"||a>this.maxValue){a=this.maxValue}this.value=Math.floor((Math.random()*(a-b+1))+b)};inalan.VisuVariable.prototype.render=function(){if(this.value>this.maxValue){this.value=this.maxValue}else{if(this.value<this.minValue){this.value=this.minValue}}this.ctx.fillStyle=this.hiddenColor;this.ctx.fillRect(this.x-this.width/2-1,this.y-this.maxValue-1,this.width+1,this.maxValue);this.ctx.fillStyle=this.fillColor;this.ctx.fillRect(this.x-this.width/2-0.5,this.y-this.value-0.5,this.width,this.value);this.ctx.strokeStyle=this.strokeColor;this.ctx.strokeRect(this.x-this.width/2-0.5,this.y-0.5-this.value,this.width,this.value);this.ctx.strokeStyle="#000";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/2-3,this.y-0.5);this.ctx.lineTo(this.x-this.width/2+this.width+2,this.y-0.5);this.ctx.stroke();if(this.changable){this.ctx.strokeStyle="#BBB";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/5,this.y-0.5-this.value-3);this.ctx.lineTo(this.x,this.y-0.5-this.value-6);this.ctx.lineTo(this.x+this.width/5,this.y-0.5-this.value-3);this.ctx.moveTo(this.x,this.y-0.5-this.value-6);this.ctx.lineTo(this.x,this.y-0.5-this.value-2);this.ctx.stroke();if(this.value>6){var d=parseInt(this.fillColor.substring(1,2),16)-3;var c=parseInt(this.fillColor.substring(2,3),16)-3;var a=parseInt(this.fillColor.substring(3,4),16)-3;if(d<0){d=0}if(c<0){c=0}if(a<0){a=0}this.ctx.strokeStyle="#"+d.toString(16)+c.toString(16)+a.toString(16);this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/5,this.y-0.5-this.value+3);this.ctx.lineTo(this.x,this.y-0.5-this.value+6);this.ctx.lineTo(this.x+this.width/5,this.y-0.5-this.value+3);this.ctx.moveTo(this.x,this.y-0.5-this.value+6);this.ctx.lineTo(this.x,this.y-0.5-this.value+2);this.ctx.stroke()}}if(this.compare){this.ctx.fillStyle="#055";this.ctx.globalAlpha=0.1;if(this.value>30){this.ctx.font="bold 26px Comic Sans MS"}else{this.ctx.font="bold "+(this.value-4)+"px Comic Sans MS"}this.ctx.textAlign="center";this.ctx.textBaseline="middle";this.ctx.fillText("?",this.x,this.y-this.value/2);this.ctx.globalAlpha=1}this.ctx.fillStyle="#000";this.ctx.font="12px Arial";this.ctx.textBaseline="alphabetic";if(this.textRotation==0){this.ctx.textAlign="center";this.ctx.fillText(this.name,this.x-0.5,this.y+13.5)}else{this.ctx.save();this.ctx.translate(this.x-0.5,this.y+13.5);this.ctx.rotate(-Math.PI/180*this.textRotation);this.ctx.textAlign="right";this.ctx.fillText(this.name,7,3);this.ctx.restore()}};inalan.VisuVariable.prototype.renderCopy=function(){if(this.copy){this.ctx.fillStyle=this.yellowColor;this.ctx.fillRect(this.copyx-this.width/2-0.5,this.copyy-this.value-0.5,this.width,this.value);this.ctx.strokeStyle="#000";this.ctx.strokeRect(this.copyx-this.width/2-0.5,this.copyy-0.5-this.value,this.width,this.value)}};inalan.VisuVariable.prototype.isOver=function(a,b){if(Math.abs(a-this.x)<this.width/2&&Math.abs(b-(this.y-this.value))<=5){return true}return false};inalan.VisuVariable.prototype.startCopying=function(){this.copyx=this.x;this.copyy=this.y;this.originalFillColor=this.fillColor;this.originalStrokeColor=this.strokeColor;this.copy=true};inalan.VisuVariable.prototype.stopCopying=function(){if(this.copy){this.fillColor=this.originalFillColor;this.strokeColor=this.originalStrokeColor;this.copy=false}};inalan.VisuVariable.prototype.startComparing=function(){this.originalFillColor=this.fillColor;this.fillColor=this.yellowColor;this.compare=true};inalan.VisuVariable.prototype.stopComparing=function(){if(this.compare){this.fillColor=this.originalFillColor;this.compare=false;this.changable=false}};inalan.VisuVariable.prototype.setDefaultColor=function(){this.fillColor=this.defaultColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setYellowColor=function(){this.fillColor=this.yellowColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setLightYellowColor=function(){this.fillColor=this.lightYellowColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setGreenColor=function(){this.fillColor=this.greenColor;this.strokeColor="#000"};inalan.VisuVariable.prototype.setGrayColor=function(){this.fillColor=this.grayColor;this.strokeColor=this.grayColor};inalan.VisuVariable.prototype.setHiddenColor=function(){this.fillColor=this.hiddenColor;this.strokeColor=this.hiddenColor};var inalan=inalan||{};inalan.VisuArray=function(b,a,d){if(typeof(d)=="undefined"){d=false}inalan.VisuData.call(this);this.name=b;this.items={length:a.length};this.showIndexes=true;this.indexes={};this.indexesPos=0;this.indexStrokeColor="#BCC";this.indexFillColor="#DEE";for(var c=0;c<a.length;c++){this.items[c]=new inalan.VisuVariable(b+"["+c+"]",a[c],d);this.items[c].textRotation=45}};inalan.VisuArray.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuArray.prototype.constructor=inalan.VisuArray;inalan.VisuArray.prototype.randomize=function(c,a){for(var b=0;b<this.items.length;b++){this.items[b].randomize(c,a)}};inalan.VisuArray.prototype.setIndex=function(a,b){this.indexes[a]=b};inalan.VisuArray.prototype.deleteIndex=function(a){delete (this.indexes[a])};inalan.VisuArray.prototype.render=function(){var f=this.items[0].height;for(var e=0;e<this.items.length;e++){if(this.items[e].height>f){f=this.items[e].height}}var c=this.x;if(this.showIndexes||Object.keys(this.indexes).length>0){this.ctx.fillStyle="#BBB";this.ctx.font="bold 12px Courier New";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";for(var b=0;b<this.items.length;b++){this.ctx.fillText(b,this.items[b].x-0.5,this.items[b].y+50+this.indexesPos)}}for(var e=0;e<this.items.length;e++){this.items[e].ctx=this.ctx;this.items[e].x=c;if(e<this.items.length-1){c=c+this.items[e].width/2+this.items[e+1].width/2+2}this.items[e].y=this.y;this.items[e].height=f;this.items[e].render();var a=this.indexesPos;for(var d in this.indexes){if(this.indexes[d]==e){this.ctx.strokeStyle=this.indexStrokeColor;this.ctx.fillStyle=this.indexFillColor;this.ctx.beginPath();this.ctx.arc(this.items[e].x,this.items[e].y+71+a-4,10,0,2*Math.PI);this.ctx.fill();this.ctx.stroke();this.ctx.fillStyle="#000";this.ctx.font="bold 14px Courier New";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";this.ctx.fillText(d,this.items[e].x-0.5,this.items[e].y+71+a);a=a+25}}}};inalan.VisuArray.prototype.renderCopy=function(){for(var a=0;a<this.items.length;a++){this.items[a].renderCopy()}};inalan.VisuArray.prototype.setMinValue=function(b){for(var a=0;a<this.items.length;a++){this.items[a].minValue=b}};inalan.VisuArray.prototype.setMaxValue=function(b){for(var a=0;a<this.items.length;a++){this.items[a].maxValue=b}};var inalan=inalan||{};inalan.VisuButton=function(c,a,b){inalan.VisuData.call(this);this.text=c;this.width=a;this.height=26;this.enabled=true;this.pressed=false;this.onClickFnc=b;this.color="#FE6";this.font="bold 14px Arial";this.defaultColor="#FE6";this.overColor="#FB3";this.disabledColor="#EEE"};inalan.VisuButton.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuButton.prototype.constructor=inalan.VisuButton;inalan.VisuButton.prototype.render=function(){if(this.enabled){this.ctx.fillStyle=this.color}else{this.ctx.fillStyle=this.disabledColor}this.ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);this.ctx.strokeStyle="#000";this.ctx.strokeRect(this.x-this.width/2-0.5,this.y-this.height/2-0.5,this.width+1,this.height+1);if(this.enabled){this.ctx.fillStyle="#000"}else{this.ctx.fillStyle="#666"}this.ctx.font=this.font;this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";this.ctx.fillText(this.text,this.x,this.y+4.5)};inalan.VisuButton.prototype.isOver=function(a,b){if(Math.abs(a-this.x)<=this.width/2&&Math.abs(b-this.y)<=this.height/2){return true}return false};var inalan=inalan||{};inalan.VisuScrollbar=function(d,f,e,b,a,c){inalan.VisuData.call(this);this.label=d;if(f<30){f=30}this.width=f;this.enabled=true;this.dragging=false;this.min=e;this.max=b;if(a<e){a=e}if(a>b){a=b}this.position=a;this.color="#FE6";this.defaultColor="#FE6";this.overColor="#FB3";this.disabledColor="#EEE";this.onChange=c};inalan.VisuScrollbar.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuScrollbar.prototype.constructor=inalan.VisuScrollbar;inalan.VisuScrollbar.prototype.render=function(){this.ctx.strokeStyle="#000";this.ctx.beginPath();this.ctx.moveTo(this.x-this.width/2-0.5,this.y+0.5);this.ctx.lineTo(this.x+this.width/2+0.5,this.y+0.5);this.ctx.moveTo(this.x-this.width/2-0.5,this.y);this.ctx.lineTo(this.x+this.width/2+0.5,this.y);this.ctx.stroke();if(this.enabled){this.ctx.fillStyle=this.color}else{this.ctx.fillStyle=this.disabledColor}this.ctx.beginPath();var b=(this.x-this.width/2+10)+(this.position-this.min)*(this.width-20)/(this.max-this.min+1);var a=this.y;this.ctx.arc(b,a,10,0,2*Math.PI);this.ctx.fill();this.ctx.stroke();this.ctx.fillStyle="#000";this.ctx.font="13px Arial";this.ctx.textAlign="center";this.ctx.textBaseline="alphabetic";this.ctx.fillText(this.label,this.x,this.y-17)};inalan.VisuScrollbar.prototype.isOver=function(a,d){var c=(this.x-this.width/2+10)+(this.position-this.min)*(this.width-20)/(this.max-this.min+1);var b=this.y;if(Math.sqrt(Math.pow(c-a,2)+Math.pow(b-d,2))<=10){return true}return false};var inalan=inalan||{};inalan.VisuLabel=function(a){inalan.VisuData.call(this);this.lines=a};inalan.VisuLabel.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuLabel.prototype.constructor=inalan.VisuLabel;inalan.VisuLabel.prototype.render=function(){this.ctx.fillStyle="#000";this.ctx.font="14px Arial";this.ctx.textAlign="left";this.ctx.textBaseline="top";for(var a=0;a<this.lines.length;a++){this.ctx.fillText(this.lines[a],this.x,this.y+a*18)}};var inalan=inalan||{};inalan.VisuCode=function(a){inalan.VisuData.call(this);this.lines=a;this.selected=[];this.selectionColor="#DEE"};inalan.VisuCode.prototype=Object.create(inalan.VisuData.prototype);inalan.VisuCode.prototype.constructor=inalan.VisuCode;inalan.VisuCode.prototype.render=function(){this.ctx.font="bold 16px Courier New";var b=0;for(var a=0;a<this.lines.length;a++){if(this.ctx.measureText(this.lines[a]).width>b){b=this.ctx.measureText(this.lines[a]).width}}this.ctx.fillStyle=this.selectionColor;for(var a in this.selected){this.ctx.fillRect(this.x,this.y+this.selected[a]*22,b+40,20)}this.ctx.fillStyle="#000";this.ctx.textAlign="left";this.ctx.textBaseline="top";for(var a=0;a<this.lines.length;a++){this.ctx.fillText(this.lines[a],this.x+20,this.y+1+a*22)}};