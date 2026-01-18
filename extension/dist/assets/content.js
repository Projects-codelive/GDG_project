console.log("Linko Scraper Loaded");function k(){const t=window.location.hostname;return t.includes("linkedin")?"linkedin":t.includes("twitter")||t.includes("x.com")?"twitter":t.includes("instagram")?"instagram":t.includes("youtube")?"youtube":"other"}function T(t){var o,s,d,f,p,g,y,h,x,S,b,w,v;const n=k();let e={platform:n,originalUrl:window.location.href,content:"",authorName:"",authorHandle:"",imageUrl:""};try{if(n==="linkedin"){const r=t||document.querySelector(".feed-shared-update-v2")||document;e.content=((o=r.querySelector(".feed-shared-update-v2__description, .update-components-text"))==null?void 0:o.innerText)||"";const a=r.querySelector(".update-components-actor__name")||r.querySelector(".feed-shared-actor__name");e.authorName=(a==null?void 0:a.innerText)||"";const c=r.querySelector(".update-components-image__image, .feed-shared-image__image");e.imageUrl=(c==null?void 0:c.src)||"";let i=null;const l=r.getAttribute("data-urn")||r.getAttribute("data-activity-urn");if(l&&!i&&(i=`https://www.linkedin.com/feed/update/${l}/`),!i){const u=r.querySelectorAll('a[href*="/feed/update/"], a[href*="/posts/"]');for(const m of u)if(m.href&&(m.href.includes("/feed/update/")||m.href.includes("/posts/"))){i=m.href;break}}if(!i){const u=r.querySelectorAll('a[href*="urn:li:activity"]');u.length>0&&(i=u[0].href)}i&&(e.originalUrl=i)}else if(n==="twitter"){const r=t||document.querySelector('article[data-testid="tweet"]');if(!r)return e;e.content=((s=r.querySelector('div[data-testid="tweetText"]'))==null?void 0:s.innerText)||"",e.authorName=((d=r.querySelector('div[data-testid="User-Name"] a'))==null?void 0:d.innerText)||"";const a=r.querySelector('img[alt="Image"]');a&&a.src.includes("media")&&(e.imageUrl=a.src);const c=r.querySelector("time");if(c){const i=c.closest("a");i&&(e.originalUrl=i.href)}}else if(n==="instagram"){const r=document.querySelector("article");if(r){const a=t||r;e.authorName=((f=a.querySelector("header span"))==null?void 0:f.innerText)||"",e.imageUrl=((p=a.querySelector("img"))==null?void 0:p.src)||"";const c=a.querySelector("h1")||a.querySelector("span");e.content=(c==null?void 0:c.innerText)||"";const i=a.querySelector("time");if(i){const l=i.closest("a");l&&(e.originalUrl=l.href)}}}else if(n==="youtube"){e.authorName=((y=(g=document.querySelector("#channel-name a, ytd-channel-name a"))==null?void 0:g.innerText)==null?void 0:y.trim())||"",e.content=((x=(h=document.querySelector("h1.ytd-video-primary-info-renderer, h1.title"))==null?void 0:h.innerText)==null?void 0:x.trim())||((S=document.querySelector('meta[name="title"]'))==null?void 0:S.content)||document.title.replace(" - YouTube","");const r=new URL(window.location.href).searchParams.get("v");r&&(e.imageUrl=`https://img.youtube.com/vi/${r}/maxresdefault.jpg`,e.originalUrl=`https://www.youtube.com/watch?v=${r}`),e.imageUrl||(e.imageUrl=((b=document.querySelector('meta[property="og:image"]'))==null?void 0:b.content)||((w=document.querySelector('link[rel="image_src"]'))==null?void 0:w.href)||"")}else e.title=document.title,e.content=((v=document.querySelector('meta[name="description"]'))==null?void 0:v.content)||""}catch(r){console.error("Scraping error:",r)}return e}function q(t){const n=document.createElement("button");return n.innerText="Save to Linko",n.style.cssText=`
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 9999;
        background: #4f46e5;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 4px;
        font-family: sans-serif;
        font-size: 12px;
        cursor: pointer;
        opacity: 0.9;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    `,n.addEventListener("click",e=>{e.preventDefault(),e.stopPropagation(),n.innerText="Saving...";const o=T(t);chrome.runtime.sendMessage({action:"save_post",data:o},s=>{s&&s.success?(n.innerText="Saved!",n.style.background="#10b981",setTimeout(()=>n.remove(),2e3)):(n.innerText="Error",n.style.background="#ef4444",setTimeout(()=>{n.innerText="Save to Linko",n.style.background="#4f46e5"},2e3))})}),n}function _(){const t=k();let n="";if(t==="linkedin"?n=".feed-shared-update-v2":t==="twitter"?n='article[data-testid="tweet"]':t==="instagram"&&(n="article"),!n)return;document.querySelectorAll(n).forEach(o=>{if(o.dataset.linkoProcessed)return;o.dataset.linkoProcessed="true",window.getComputedStyle(o).position==="static"&&(o.style.position="relative");const d=q(o);o.appendChild(d)})}setInterval(_,2e3);chrome.runtime.onMessage.addListener((t,n,e)=>{if(t.action==="scrape_and_save"){const o=T(null);t.info.selectionText&&(o.content=t.info.selectionText),t.info.linkUrl&&(o.originalUrl=t.info.linkUrl),t.info.srcUrl&&(o.imageUrl=t.info.srcUrl),chrome.runtime.sendMessage({action:"save_post",data:o},e)}if(t.action==="show_notification"){const o=document.createElement("div");o.innerText=t.message,o.style.cssText=`
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${t.status==="success"?"#10b981":"#ef4444"};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: sans-serif;
        animation: slideIn 0.3s ease-out;
      `,document.body.appendChild(o),setTimeout(()=>o.remove(),3e3)}});const U=document.createElement("style");U.innerHTML=`
@keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
`;document.head.appendChild(U);
