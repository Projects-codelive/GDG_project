/* empty css     */console.log("Linko Scraper Loaded");function h(){const e=window.location.hostname;return e.includes("linkedin")?"linkedin":e.includes("twitter")||e.includes("x.com")?"twitter":e.includes("instagram")?"instagram":"other"}function y(e){var r,c,d,m,p,g;const t=h();let n={platform:t,originalUrl:window.location.href,content:"",authorName:"",authorHandle:"",imageUrl:""};try{if(t==="linkedin"){const o=e||document.querySelector(".feed-shared-update-v2")||document;n.content=((r=o.querySelector(".feed-shared-update-v2__description, .update-components-text"))==null?void 0:r.innerText)||"";const a=o.querySelector(".update-components-actor__name")||o.querySelector(".feed-shared-actor__name");n.authorName=(a==null?void 0:a.innerText)||"";const s=o.querySelector(".update-components-image__image, .feed-shared-image__image");n.imageUrl=(s==null?void 0:s.src)||"";let i=null;const l=o.getAttribute("data-urn")||o.getAttribute("data-activity-urn");if(l&&!i&&(i=`https://www.linkedin.com/feed/update/${l}/`),!i){const u=o.querySelectorAll('a[href*="/feed/update/"], a[href*="/posts/"]');for(const f of u)if(f.href&&(f.href.includes("/feed/update/")||f.href.includes("/posts/"))){i=f.href;break}}if(!i){const u=o.querySelectorAll('a[href*="urn:li:activity"]');u.length>0&&(i=u[0].href)}i&&(n.originalUrl=i)}else if(t==="twitter"){const o=e||document.querySelector('article[data-testid="tweet"]');if(!o)return n;n.content=((c=o.querySelector('div[data-testid="tweetText"]'))==null?void 0:c.innerText)||"",n.authorName=((d=o.querySelector('div[data-testid="User-Name"] a'))==null?void 0:d.innerText)||"";const a=o.querySelector('img[alt="Image"]');a&&a.src.includes("media")&&(n.imageUrl=a.src);const s=o.querySelector("time");if(s){const i=s.closest("a");i&&(n.originalUrl=i.href)}}else if(t==="instagram"){const o=document.querySelector("article");if(o){const a=e||o;n.authorName=((m=a.querySelector("header span"))==null?void 0:m.innerText)||"",n.imageUrl=((p=a.querySelector("img"))==null?void 0:p.src)||"";const s=a.querySelector("h1")||a.querySelector("span");n.content=(s==null?void 0:s.innerText)||"";const i=a.querySelector("time");if(i){const l=i.closest("a");l&&(n.originalUrl=l.href)}}}else n.title=document.title,n.content=((g=document.querySelector('meta[name="description"]'))==null?void 0:g.content)||""}catch(o){console.error("Scraping error:",o)}return n}function S(e){const t=document.createElement("button");return t.innerText="Save to Linko",t.style.cssText=`
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
    `,t.addEventListener("click",n=>{n.preventDefault(),n.stopPropagation(),t.innerText="Saving...";const r=y(e);chrome.runtime.sendMessage({action:"save_post",data:r},c=>{c&&c.success?(t.innerText="Saved!",t.style.background="#10b981",setTimeout(()=>t.remove(),2e3)):(t.innerText="Error",t.style.background="#ef4444",setTimeout(()=>{t.innerText="Save to Linko",t.style.background="#4f46e5"},2e3))})}),t}function k(){const e=h();let t="";if(e==="linkedin"?t=".feed-shared-update-v2":e==="twitter"?t='article[data-testid="tweet"]':e==="instagram"&&(t="article"),!t)return;document.querySelectorAll(t).forEach(r=>{if(r.dataset.linkoProcessed)return;r.dataset.linkoProcessed="true",window.getComputedStyle(r).position==="static"&&(r.style.position="relative");const d=S(r);r.appendChild(d)})}setInterval(k,2e3);chrome.runtime.onMessage.addListener((e,t,n)=>{if(e.action==="scrape_and_save"){const r=y(null);e.info.selectionText&&(r.content=e.info.selectionText),e.info.linkUrl&&(r.originalUrl=e.info.linkUrl),e.info.srcUrl&&(r.imageUrl=e.info.srcUrl),chrome.runtime.sendMessage({action:"save_post",data:r},n)}if(e.action==="show_notification"){const r=document.createElement("div");r.innerText=e.message,r.style.cssText=`
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${e.status==="success"?"#10b981":"#ef4444"};
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        font-family: sans-serif;
        animation: slideIn 0.3s ease-out;
      `,document.body.appendChild(r),setTimeout(()=>r.remove(),3e3)}});const x=document.createElement("style");x.innerHTML=`
@keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}
`;document.head.appendChild(x);
