import{j as a}from"./js-yaml.38530ef5.js";const u=function(t){return a.load(t)};class p{constructor(s){var i,o,r;if(s!=null){const e=u(s);this.id=e.id,this.version=e.version,this.name=e.name,this.description=e.description,this.tags=[],e.tags!=null&&((i=e.tags)==null||i.forEach(n=>{this.tags.push(n)})),this.links=[],e.links!=null&&((o=e.links)==null||o.forEach(n=>{this.links.push(new w(n))})),this.review=[],e.review!=null&&((r=e.review)==null||r.forEach(n=>{this.review.push(new f(n))})),this.steps=[],e.steps!=null&&e.steps.forEach(n=>{this.steps.push(new h(n))})}}}class w{constructor(s){this.name=s.name,this.url=s.url,this.description=s.description}}class f{constructor(s){this.name=s.name,this.date=s.date}}class h{constructor(s){s!=null&&(this.sequence=s.sequence,this.description=s.description,this.producer=new l(s.producer),this.consumer=new l(s.consumer),this.interaction=new c(s.interaction),this.return=new m(s.return),this.node=s.note,this.steps=[],s.steps!=null&&s.steps.forEach(i=>{this.steps.push(new h(i))}),this.overrides=[],s.overrides!=null&&s.overrides.forEach(i=>{this.overrides.push(new y(i))}),s.condition!=null&&(this.condition=new d(s.condition)))}}class l{constructor(s){this.name=s==null?void 0:s.name,this.$ref=s==null?void 0:s.$ref}}class c{constructor(s){this.$ref=s==null?void 0:s.$ref,this.endpoint=s==null?void 0:s.endpoint}}class m{constructor(s){this.value=s==null?void 0:s.value,this.interaction=new c(s==null?void 0:s.interaction)}}class d{constructor(s){this.name=s.name,this.steps=[],s.steps!=null&&s.steps.forEach(i=>{this.steps.push(new h(i))}),s.else!=null&&(this.else=new v(s.else))}}class v{}class y{constructor(s){this.regex=s.regex,this.value=s.value}}async function E(t,s,i){return await t(`query getFDs($owner: String!, $name: String!) {
                    repository(owner: $owner, name: $name ) {
                        object(expression: "HEAD:resources/architecture_flows/sequence/") {
                          ... on Tree {
                            entries {
                              name
                              type
                              mode
                              path

                              object {
                                ... on Blob {
                                  byteSize
                                  text
                                  isBinary
                                }
                              }
                            }
                          }
                        }
                    }
                }`,{owner:s,name:i})}class ${getFlows(s){return E(s.connection,s.owner,s.repo).then(i=>{let o=[];return i.repository.object.entries.forEach(r=>{if(r.type==="blob"){let e=r.object.text;o.push(new p(e))}}),Promise.resolve(o)})}}export{l as A,$ as F,c as I,h as S,p as a};
