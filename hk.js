const puppeteer=require('puppeteer');
const codeObj=require('./codee')

const loginlink='https://www.hackerrank.com/auth/login'
const email='priyuuii35@gmail.com'
const password='@Pri_yu12'


let browserOpen=puppeteer.launch({
    headless : false,

    args:['--start-maximized'],

    defaultViewport:null
})
let page

browserOpen.then(function(browserObj){
    let browserOpenPromise=browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page=newTab
    let hackerRankOpenPromise=newTab.goto(loginlink);
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered=page.type("input[id='input-1']",email, {delay :50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered=page.type("input[type='password']",password, {delay :50})
    return passwordIsEntered

    
}).then(function(){
    let loginButtonClicked=page.click('button[data-analytics="LoginPassword"]' ,{delay:50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise=waitAndClick('.topic-card a[data-attr1="algorithms"]',page)
    return clickOnAlgoPromise
    
}).then(function(){
    let goToWarmUp=waitAndClick('input[value="warmup"]',page)
    return goToWarmUp
}).then(function(){
    let waitfor3sec=page.waitFor(3000)
    return waitfor3sec   //for #sec

}).then(function(){
    let allChallengesPromise=page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled',{delay:50})
    return allChallengesPromise;
}).then(function(questionsArr){
    console.log('number of questions',questionsArr.length)
    let questionWillBeSolved=questionSolver(page,questionsArr[0] , codeObj.answers[0])
    return questionWillBeSolved

})




function waitAndClick(selector , cPage){
    return new Promise(function(resolve, reject){
        let waitForModelPromise=cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel=cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}


function questionSolver(page, question, answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked=question.click()
        questionWillBeClicked.then(function(){
            let EditorInFocusPromise=waitAndClick('.monaco-editor.no-user-select.vs', page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input', page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput', page)
        }).then(function(){
            return page.type('textarea.custominput' , answer , {delay:10})
        }).then(function(){
            let ctrlIsPressed= page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AisPressed=page.keyboard.press('A', {delay:100})
            return AisPressed
        }).then(function(){
            let XisPressed=page.keyboard.press('X', {delay:100})
            return XisPressed
        }).then(function(){
            let ctrlisUnPressed = page.keyboard.up('Control')
            return ctrlisUnPressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs' , page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlisPressed= page.keyboard.down('Control')
            return ctrlisPressed
            
        }).then(function(){
            let AisPressed=page.keyboard.press('A',{delay:80})
            return AisPressed

        }).then(function(){
            let VIsPressed=page.keyboard.press('V', {delay:80})
            return VIsPressed
        }).then(function(){
            let ctrlisUnPressed = page.keyboard.up('Control')
            return ctrlisUnPressed
        }).then(function(){
            return page.click('.hr-monaco__run-code' , {delay:50})
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject();
        })
    })
}






