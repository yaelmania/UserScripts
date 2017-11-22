﻿// ==UserScript==
// @name          ZD AutoImage Boorus
// @namespace     https://github.com/ZeroDrako/ZD-AutoImage-Boorus
// @version       1.1
// @description   Add function OneClick-To-Downnload Images from Danbooru, Gelbooru, Safebooru, Sankakucomplex, Yande.re, Rule34.xxx, Furry.booru
// @author        ZeroDrako
// @updateURL     https://raw.githubusercontent.com/ZeroDrako/AutoImage-Boorus/master/ZD%20AutoImage%20Booru.last_release.js
// @downloadURL   https://raw.githubusercontent.com/ZeroDrako/AutoImage-Boorus/master/ZD%20AutoImage%20Booru.last_release.js
// @license       GPLv3; https://raw.githubusercontent.com/ZeroDrako/AutoImage-Boorus/master/LICENSE
// @include       http://danbooru.donmai.us/*
// @include       http://gelbooru.com/index.php*
// @include       http://safebooru.org/index.php*
// @include       https://chan.sankakucomplex.com/*
// @include       https://yande.re/*
// @include       http://rule34.xxx/index.php*
// @include       http://furry.booru.org/index.php*
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @require       https://raw.githubusercontent.com/ZeroDrako/Libs/master/jQuery/v1/jquery-1.12.2.min.js
// @require       https://raw.githubusercontent.com/ZeroDrako/Libs/master/FileSaver/v1.1.20160328/FileSaver.min.js
// @icon          http://i1236.photobucket.com/albums/ff444/ZeroDrako/128_zpstpkixbgq.png
// ==/UserScript==
var downFiles = [],
    yandere = false,
    sankaku = false,
    danbooru = false,
    gelbooru = false,
    safebooru = false,
    rule34 = false,
    furry = false,
    url = window.location.href,
    downFiles = stringToFiles(GM_getValue("Files", ""));

function loadVarPerSite() {
    GM_addStyle('@-webkit-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@-o-keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}@keyframes progress-bar-stripes{from{background-position:40px 0}to{background-position:0 0}}.progress{overflow:hidden;height:12px;background-color:#f5f5f5;border-radius:4px;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,0.1);box-shadow:inset 0 1px 2px rgba(0,0,0,0.1)}.progress-bar{float:left;width:0%;height:100%;font-size:12px;line-height:20px;color:#ffffff;text-align:center;background-color:#337ab7;-webkit-box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);box-shadow:inset 0 -1px 0 rgba(0,0,0,0.15);-webkit-transition:width 0.6s ease;-o-transition:width 0.6s ease;transition:width 0.6s ease}.progress-striped .progress-bar,.progress-bar-striped{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);-webkit-background-size:40px 40px;background-size:40px 40px}.progress.active .progress-bar,.progress-bar.active{-webkit-animation:progress-bar-stripes 2s linear infinite;-o-animation:progress-bar-stripes 2s linear infinite;animation:progress-bar-stripes 2s linear infinite}.progress-bar-success{background-color:#5cb85c}.progress-striped .progress-bar-success{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-bar-info{background-color:#5bc0de}.progress-striped .progress-bar-info{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-bar-warning{background-color:#f0ad4e}.progress-striped .progress-bar-warning{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}.progress-bar-danger{background-color:#d9534f}.progress-striped .progress-bar-danger{background-image:-webkit-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:-o-linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent);background-image:linear-gradient(45deg,rgba(255,255,255,0.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,0.15) 50%,rgba(255,255,255,0.15) 75%,transparent 75%,transparent)}');
    GM_addStyle('.ZDOptionTitle{font-size:12px;font-weight:bold;padding-bottom:1%}#ZDdirselect{display:none}#ZDtitle{padding-top:20px}.ZDOptionDown{font-weight:400;float:right!important;margin-right:12%;font-size:11px;border:1px solid #EAEAEA}#ZDdirectory{color:#666;border:1px solid #202529;background:#000}');
    if (/yande\.re/.test(url)) {
        yandere = true;
        GM_addStyle('.ZDOptionTitle{color:#ee8887!important}#ZDtitle{font-size:14px}.ZDOptionDown{color:#ffbbbb;background:#222}.ZDOptionDown:hover{background:#ee8887;color:white}a.directlink{margin-top:5px!important}');
    } else if (/chan\.sankaku/.test(url)) {
        sankaku = true;
        GM_addStyle('.ZDOptionTitle{color:#FF761C!important;font-size:12px;font-weight:bold;padding-bottom:1%}#ZDdirselect{display:none}#ZDdirhelp{margin-right:10%!important;padding:1%!important}#ZDtitle{padding-top:20px;font-size:13px}.ZDOptionDown{float:right!important;margin-right:12%;font-size:11px;font-weight:400!important;color:black;border:1px solid #DDDDDD!important;background:#FAFAFA}.ZDOptionDown:hover{background:#FF761C!important;color:white!important}#ZDdirectory{color:#666;border:1px solid #202529;background:#000}div.content{padding-left:250px!important}');
        try {
            mutationEvent();
        } catch (e) {
            console.log(e);
        }
    } else if (/danbooru\.donmai\.us/.test(url)) {
        danbooru = true;
        GM_addStyle('.ZDOptionTitle{color:#0073ff!important;list-style-type:none}#ZDtitle{color:#0073ff;font-size:14px}.ZDOptionDown{color:black;border:1px solid #EAEAEA;background:white}.ZDOptionDown:hover{background:#F7F7FF;color:black}article.post-preview{height:170px!important}');
    } else if (/gelbooru/.test(url)) {
        gelbooru = true;
        GM_addStyle('.ZDOptionTitle{color:#1A7FFC!important;list-style-type:none}#ZDtitle{color:black;font-size:18px!important;padding-bottom:10px}.ZDOptionDown{color:black;border:1px solid #EAEAEA;background:white}.ZDOptionDown:hover{background:#E29900;color:white}article.post-preview{height:170px!important}');
    } else if (/safebooru/.test(url)) {
        safebooru = true;
        GM_addStyle('.ZDOptionTitle{color:#006FFA!important;font-size:12px;font-weight:bold;padding-bottom:1%;list-style-type:none}#ZDdirselect{display:none}#ZDtitle{color:black;padding-top:20px;font-size:13px!important;padding-bottom:10px}.ZDOptionDown{float:right!important;margin-right:12%;font-size:11px;font-weight:400;color:black;border:1px solid #EAEAEA;background:white}.ZDOptionDown:hover{background:#D9E6F7}#ZDdirectory{color:#666;border:1px solid #202529;background:#000}article.post-preview{height:170px!important}');
    } else if (/rule34\.xxx/.test(url)) {
        rule34 = true;
        GM_addStyle('.ZDOptionTitle{color:#009!important;list-style-type:none}#ZDtitle{color:black;font-size:15px!important;padding-bottom:10px}.ZDOptionDown{color:black;border:1px solid #EAEAEA;background:#8ABC8B}.ZDOptionDown:hover{background:#8ABC8B;color:white}article.post-preview{height:170px!important}');
    } else if (/furry\.booru/.test(url)) {
        furry = true;
        GM_addStyle('.ZDOptionTitle{color:#1A7FFC!important;list-style-type:none}#ZDtitle{color:black;font-size:14px!important;padding-bottom:10px}.ZDOptionDown{color:black;border:1px solid #EAEAEA;background:white}.ZDOptionDown:hover{background:#E29900;color:white}article.post-preview{height:170px!important}');
    } else {
        return;
    }
}

function loadPreferences() {
    try {
        document.getElementById('ZDalertdialog').value = GM_getValue("ArtDialog", false);
        document.getElementById('ZDdownone').value = GM_getValue("DownloadOne", false);
        document.getElementById('ZDdownorig').value = GM_getValue("DownloadOrig", false);
        document.getElementById('ZDaddnews').value = GM_getValue("AddNewsFiles", false);
        document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
    } catch (event) {
        console.log(event.id + ' >>> ' + event.message);
    }
}

function addSettingPanel() {
    var settingPanel = document.createElement('div');
    settingPanel.id = 'ZDpopup';
    settingPanel.innerHTML = '<div id=ZDtitle><h5>ZD AutoImage Booru v1</h5></div><div class=wrap><form id=translateForm><div><li class=ZDOptionTitle>Down One?<select class=ZDOptionDown id=ZDdownone><option value=false>No<option value=true>Yes</select><li class=ZDOptionTitle>Down Orig?<select class=ZDOptionDown id=ZDdownorig><option value=false>No<option value=true>Yes</select><li class=ZDOptionTitle>Add News?<select class=ZDOptionDown id=ZDaddnews><option value=false>No<option value=true>Yes</select><li class=ZDOptionTitle>Alert Dial?<select class=ZDOptionDown id=ZDalertdialog><option value=false>No<option value=true>Yes</select><li class=ZDOptionTitle>Files:<h7 id=ZDnumfiles></h7><input id=ZDdirselect type=file directory multiple webkitdirectory> <input id=ZDdirhelp type=button class=ZDOptionDown onclick=\'document.getElementById("ZDdirselect").click()\'value=Browse...></div><p class=ZDoption id=ZDsaved></form></div>';
    var query = '';
    if (yandere || sankaku) {
        query = 'div.sidebar > div';
    } else if (danbooru) {
        query = '#sidebar > section#search-box';
    } else if (gelbooru || safebooru || rule34 || furry) {
        query = '#post-list > div.sidebar > div';
    } else {
        return;
    }
    document.querySelector(query).appendChild(settingPanel);

    function hideshow(opres) {
        var saved;

        function show() {
            saved = document.getElementById("ZDsaved").innerHTML = opres;
        }

        function hide() {
            saved = document.getElementById("ZDsaved").innerHTML = "&nbsp;";
        }
        setTimeout(show, 100);
        setTimeout(hide, 200);
        setTimeout(show, 300);
        setTimeout(hide, 400);
        setTimeout(show, 500);
        setTimeout(hide, 1500);
    }
    settingPanel.addEventListener('change', function(event) {
        switch (event.target.id) {
            case 'ZDalertdialog':
                GM_setValue("ArtDialog", document.getElementById('ZDalertdialog').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDdownone':
                GM_setValue("DownloadOne", document.getElementById('ZDdownone').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDdownorig':
                GM_setValue("DownloadOrig", document.getElementById('ZDdownorig').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDaddnews':
                GM_setValue("AddNewsFiles", document.getElementById('ZDaddnews').value === "true" ? true : false);
                hideshow("Saved!!!");
                break;
            case 'ZDdirselect':
                var files = event.target.files;
                if (files.length !== 0) {
                    for (var i = 0, f, downFiles = []; f = files[i]; i++) {
                        if (f.type.match('image.*') || f.type.match('video.webm')) {
                            downFiles.push(f.name);
                        }
                    }
                    GM_setValue("Files", filesToString(downFiles));
                    document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
                    hideshow("Saved!!!");
                }
                break;
            default:
                hideshow("Canceled!!!");
                break;
        }
    });
}

function mutationEvent() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var obs = new MutationObserver(function(mutations, observer) {
        for (var i = 0; i < mutations.length; ++i) {
            for (var j = 0; j < mutations[i].addedNodes.length; ++j) {
                if (mutations[i].addedNodes[j].getAttribute('class') === "content-page") {
                    addProgressBar(mutations[i].addedNodes[j].getAttribute('id'));
                }
            }
        }
    });
    obs.observe((document.querySelector('#post-list > div.content')), {
        childList: true
    });
}

function addProgressBar(idNewDiv) {
    var toop, pre;
    if (yandere) {
        pre = 'p';
        toop = document.querySelectorAll('#post-list-posts > li');
    } else if (sankaku) {
        pre = 'p';
        if (idNewDiv !== null) {
            toop = document.querySelectorAll('.content > div[id="' + idNewDiv + '"] > span');
        } else {
            toop = document.querySelectorAll('.content > div > span');
        }
    } else if (danbooru) {
        pre = 'post_';
        toop = document.querySelectorAll('div#posts > div > article');
    } else if (gelbooru || safebooru || rule34 || furry) {
        pre = 's';
        toop = document.querySelectorAll('#post-list > div.content > div > span.thumb');
    } else {
        return;
    }
    for (var i = 0; i < toop.length; i++) {
        var div1 = document.createElement('div'),
            div2 = document.createElement('div'),
            name = getNameCheck((toop[i].id));
        div1.setAttribute('class', 'progress');
        div1.setAttribute('id', ((toop[i].id).replace(pre, 'ZdBarE')));
        div2.setAttribute('class', 'progress-bar progress-bar-striped');
        div2.setAttribute('id', ((toop[i].id).replace(pre, 'ZdBarI')));
        div2.setAttribute('style', 'width:0%');
        downFiles.forEach(function(element) {
            if (element.match(name)) {
                div2.setAttribute('style', 'width:100%; background-color: #5CB85C;');
            }
        });
        div2.setAttribute('role', 'progressbar');
        if (GM_getValue("DownloadOne")) {
            div1.addEventListener('click', downloadOne);
        }
        div1.appendChild(div2);
        toop[i].appendChild(div1);
    }
}

function downloadOne() {
    var idImg = (this.id).replace('ZdBarE', '');
    var barId = '#ZdBarI' + idImg;
    getLink(idImg, barId);
}

function getLink(idImg, barId) {
    var source, parser = new DOMParser(),
        bar = document.querySelector(barId);
    bar.classList.add("active");
    bar.style = 'width: 5%; background-color: #F0AD4E;';
    if (yandere) {
        source = document.querySelector('#post-list-posts > li[id="p' + idImg + '"] > div.inner > a.thumb').href;
    } else if (sankaku) {
        source = document.querySelector('.content > div > span[id="p' + idImg + '"] > a').href;
    } else if (danbooru) {
        source = document.querySelector('div#posts > div > article[id="post_' + idImg + '"]').getAttribute('data-file-url');
        source = 'http://danbooru.donmai.us' + source;
        var name = getNameDown(source);
        downloadCheck(source, name, barId);
        return;
    } else if (gelbooru || safebooru || rule34 || furry) {
        source = document.querySelector('#post-list > div.content > div > span[id="s' + idImg + '"] > a').href;
    } else {
        console.log('Fail at \'getLink\'' + ' >>> ' + idImg);
        return;
    }
    GM_xmlhttpRequest({
        url: source,
        method: "GET",
        responseType: 'text',
        onreadystatechange: function(res) {
            if (res.readyState === 4 && res.status === 404) {
                console.log('Fail at \'getLink > GM_xmlhttpRequest\'' + ' >>> ' + source);
            }
            if (res.readyState === 4 && res.status === 200) {
                var dom = parser.parseFromString(res.response, "text/html");
                var siz = null,
                    source = null;
                if (yandere) {
                    siz = dom.querySelectorAll('#post-view > .sidebar > div:nth-of-type(4) a[id]');
                    if (GM_getValue("DownloadOrig")) {
                        source = ((siz[siz.length - 1]).getAttribute('href'));
                    } else {
                        source = ((siz[siz.length - 2]).getAttribute('href'));
                        if (source.indexOf('files.yande.re') === -1) {
                            source = ((siz[siz.length - 1]).getAttribute('href'));
                        }
                    }
                } else if (sankaku) {
                    siz = dom.querySelectorAll('.sidebar  #stats > ul > li > a[id]');
                    if (GM_getValue("DownloadOrig")) {
                        source = ('https:' + (siz[siz.length - 1]).getAttribute('href')).replace(/(\?(\d+))$/g, '');
                    } else {
                        source = ('https:' + (siz[siz.length - 2]).getAttribute('href')).replace(/(\?(\d+))$/g, '');
                        if (source.indexOf('cs.sankakucomplex.com/data/') === -1) {
                            source = ('https:' + (siz[siz.length - 1]).getAttribute('href')).replace(/(\?(\d+))$/g, '');
                        }
                    }
                } else if (gelbooru) {
                    source = dom.querySelector('div.sidebar3 > div > ul > li > a[href][style]').getAttribute('href');
                } else if (safebooru || rule34 || furry) {
                    if (GM_getValue("DownloadOrig")) {
                        source = dom.querySelector('#post-view > .sidebar > div > ul > li > a[href][style]').getAttribute('href');
                    } else {
                        try {
                            source = dom.querySelector('#right-col > div > img').getAttribute('src').replace(/(\?(\d+))$/g, '');
                        } catch (e) {
                            source = dom.querySelector('#right-col > div > video > source').getAttribute('src').replace(/(\?(\d+))$/g, '');
                        }
                    }
                    if (rule34) {
                        source = 'http:' + source;
                    }
                }
                var name = getNameDown(source);
                downloadCheck(source, name, barId);
            }
        },
        onerror: function(res) {
            bar.style = 'width: 100%; background-color: #D9534F;';
            bar.classList.remove("active");
            console.log(res);
        }
    });
}

function getNameDown(source) {
    return decodeURLRecursively(source.substring(source.lastIndexOf("/") + 1));
}

function getNameCheck(idImg) {
    var source;
    if (yandere) {
        source = (document.querySelector('#post-list-posts > li[id="' + idImg + '"] img')).getAttribute('title');
        source = source.substring(source.indexOf('Tags:') + 5, source.indexOf('User:')).trim();
        return source;
    } else if (sankaku) {
        source = document.querySelector('.content > div > span[id="' + idImg + '"] > a > img').src;
        source = source.substring((source.lastIndexOf('/') + 1), source.lastIndexOf('.'));
        return source;
    } else if (danbooru) {
        source = document.querySelector('div#posts > div > article[id="' + idImg + '"]').getAttribute('data-file-url');
        source = source.substring((source.lastIndexOf('/') + 1), source.lastIndexOf('.'));
        return source;
    } else if (gelbooru || safebooru || rule34 || furry) {
        source = document.querySelector('#post-list > div.content > div > span[id="' + idImg + '"] > a > img').src;
        source = source.substring((source.lastIndexOf('/') + 1), source.lastIndexOf('.')).replace('thumbnail_', '');
        return source;
    } else {
        console.log('Fail at \'getLink\'' + ' >>> ' + idImg);
        return 'unknow';
    }
}

function downloadCheck(source, name, barId) {
    var bar = document.querySelector(barId);
    if (downFiles.indexOf(name) !== -1) {
        if (GM_getValue("ArtDialog")) {
            var r = confirm("File already Downloaded, Download Again???");
            if (r === true) {
                downloadImage(source, name, barId);
            } else {
                bar.classList.remove("active");
                bar.style = 'width: 100%; background-color: #5CB85C;';
            }
        } else {
            bar.classList.remove("active");
            bar.style = 'width: 100%; background-color: #5CB85C;';
            console.log('File already Downloaded!!!');
        }
    } else {
        downloadImage(source, name, barId);
    }
}

function downloadImage(source, name, barId) {
    console.log(source);
    console.log(name);
    var bar = document.querySelector(barId);
    bar.style = 'width: 0%;';
    GM_xmlhttpRequest({
        url: source,
        method: "GET",
        responseType: 'blob',
        onreadystatechange: function(res) {
            if (res.readyState === 4 && res.status === 404) {
                console.log('Fail at \'downloadImage > GM_xmlhttpRequest\'' + ' >>> ' + source);
            }
            if (res.readyState === 4 && res.status === 200) {
                if (GM_getValue("AddNewsFiles")) {
                    downFiles.push(name);
                    GM_setValue("Files", filesToString(downFiles));
                    document.getElementById('ZDnumfiles').innerHTML = stringToFiles(GM_getValue("Files", "")).length;
                }
                saveAs(this.response, name);
                bar.style = 'width: 100%; background-color: #5CB85C;';
                bar.classList.remove("active");
            }
        },
        onprogress: function(res) {
            if (GM_getValue("DownloadOne")) {
                if (res.lengthComputable) {
                    bar.style = 'width: ' + ((res.loaded / res.total) * 100) + '%; background-color: #337ab7;';
                }
            }
        },
        onerror: function(res) {
            bar.style = 'width: 100%; background-color: #D9534F;';
            bar.classList.remove("active");
            console.log(res);
        }
    });
}

function decodeURLRecursively(url) {
    if (url.indexOf('%') !== -1) {
        return decodeURLRecursively(decodeURIComponent(url));
    }
    if (url.indexOf('+') !== -1) {
        return decodeURLRecursively(url.replace("+", " "));
    }
    return url;
}

function filesToString(downFiles) {
    for (var i = 0, temp = ""; i < downFiles.length; i++) {
        temp += downFiles[i] + ((i === downFiles.length - 1) ? "" : "\\");
    }
    return temp;
}

function stringToFiles(str) {
    downFiles = [];
    downFiles = str.split("\\");
    return downFiles;
}

function firstLaunch() {
    var defaultValues = [
        ["FirstLaunch", false],
        ["ArtDialog", false],
        ["DownloadOne", true],
        ["DownloadOrig", true],
        ["AddNewsFiles", true],
        ["Files", ""]
    ];
    for (var i = 0; i < defaultValues.length; i++) {
        if (GM_getValue(defaultValues[i][0]) === undefined) {
            GM_setValue(defaultValues[i][0], defaultValues[i][1]);
        }
    }
}

function master() {
    if (GM_getValue("FirstLaunch") !== false) {
        firstLaunch();
    }
    loadVarPerSite();
    addSettingPanel();
    loadPreferences();
    if (GM_getValue("DownloadOne")) {
        addProgressBar(null);
    }
}

master();
