(this.webpackJsonpapplication=this.webpackJsonpapplication||[]).push([[0],{211:function(e,t,a){e.exports=a(405)},404:function(e,t,a){},405:function(e,t,a){"use strict";a.r(t);var n=a(10),r=a(12),o=a(14),l=a(15),c=a(0),i=a.n(c),s=a(3),u=a.n(s),m=a(83),d=a(59);var p=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!1,data:{},error:!1},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;switch(t.type){case"RECV_USER":return Object.assign({},e,{isLoading:!1,data:t.data,error:!1});case"REQ_USER":return Object.assign({},e,{isLoading:!0,error:!1});default:return e}};var f=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{isLoading:!1,data:[],error:!1},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;switch(t.type){case"RECV_PROXY":return Object.assign({},e,{isLoading:!1,data:t.data,error:!1});case"REQ_PROXY":return Object.assign({},e,{isLoading:!0,error:!1});case"REQ_PROXY_DELETE":var a=t.data,n=e.data.filter((function(e){return e._id!==a}));return Object.assign({},e,{isLoading:!0,data:n,error:!1});default:return e}},E=Object(d.c)({user:p,proxy:f}),h=a(182),b=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||d.d,g=Object(d.e)(E,b(Object(d.a)(h.a))),y=a(66),v=a(64),O=a(406),x=O.a.Footer,j=(i.a.Component,O.a.Header,O.a.Content),k=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(O.a,null,i.a.createElement(j,{style:{margin:"24px 16px 0",height:"100%",overflowY:"auto"}}))}}]),a}(i.a.Component),C=(O.a.Header,O.a.Content),R=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(O.a,null,i.a.createElement(C,{style:{background:"#fff",margin:"16px 12px 0",height:"100%",overflowY:"auto"}},"\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435"))}}]),a}(i.a.Component),w=a(98),I=a(72),L=a(19),_=a(410),S=a(414),M=a(408),P=a(411),T=w.a.Option,V={labelCol:{span:8},wrapperCol:{span:16}},U=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).setModalVisible=function(e){r.setState({modal:e})},r.setModalLoading=function(e){r.setState({loading:e})},r.onFinish=function(e){r.setModalLoading(!0),setTimeout((function(){r.setModalLoading(!1),r.setModalVisible(!1),r.reset()}),2e3),console.log(e)},r.reset=function(){r.formRef.current.resetFields()},r.state={modal:!1,loading:!1},r.formRef=i.a.createRef(),r}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return i.a.createElement(I.a,{theme:"light",mode:"horizontal",style:{lineHeight:"64px"},selectable:!1},i.a.createElement(I.a.Item,{key:"1"},i.a.createElement(L.a,{icon:i.a.createElement(S.a,null),onClick:function(){return e.setModalVisible(!0)}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f")),i.a.createElement(_.a,{title:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",wrapClassName:"vertical-center-modal",visible:this.state.modal,confirmLoading:this.state.loading,onCancel:function(){return e.setModalVisible(!1)},cancelText:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",okText:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",okButtonProps:{form:"new-user",key:"submit",htmlType:"submit"}},i.a.createElement(M.a,Object.assign({},V,{name:"new-user",onFinish:this.onFinish,ref:this.formRef}),i.a.createElement(M.a.Item,{name:["user","name"],label:"\u0418\u043c\u044f",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["user","user-agent"],label:"UserAgent",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["user","access-token"],label:"AccessToken",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["user","proxy"],label:"proxy",rules:[{required:!0}]},i.a.createElement(w.a,null,i.a.createElement(T,{value:"1"},"Proxy 1 | RU"),i.a.createElement(T,{value:"2"},"Proxy 3 | UK"),i.a.createElement(T,{value:"3"},"Proxy 4 | US"),i.a.createElement(T,{value:"4"},"Proxy 5 | FR"))))))}}]),a}(i.a.Component),F=a(409),D=a(38),Y=a(87),q=a(415),X=F.a.Meta,H=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){var e;Object(n.a)(this,a);for(var r=arguments.length,o=new Array(r),l=0;l<r;l++)o[l]=arguments[l];return(e=t.call.apply(t,[this].concat(o))).createUsers=function(){for(var e=[],t=0;t<60;t++)e.push(i.a.createElement(D.a,{className:"gutter-row",span:4,xxl:4,xl:6,lg:6,md:6,sm:8,xs:12},i.a.createElement(F.a,{hoverable:!0,style:{marginBottom:"10px",padding:"10px"},cover:i.a.createElement(q.a,{style:{fontSize:"40px",paddingTop:"15px"}})},i.a.createElement(X,{title:"Ivan Logunov",description:"Description about account"}))));return e},e}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(Y.a,{gutter:12,style:{padding:"20px"}},this.createUsers())}}]),a}(i.a.Component),N=O.a.Header,Q=O.a.Content,B=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(O.a,null,i.a.createElement(N,{style:{background:"#fff",padding:"0"}},i.a.createElement(U,null)),i.a.createElement(Q,{style:{background:"#fff",margin:"16px 12px 0",height:"100%",overflowY:"auto"}},i.a.createElement(H,null)))}}]),a}(i.a.Component),z=a(416),A=a(417),J=a(418),K=a(419),W=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"render",value:function(){return i.a.createElement(I.a,{theme:"dark",mode:"inline",style:{height:"100%"},defaultSelectedKeys:["1"]},i.a.createElement(I.a.Item,{key:"1"},i.a.createElement(y.b,{to:"/home"},i.a.createElement(z.a,null),"\u0413\u043b\u0430\u0432\u043d\u0430\u044f")),i.a.createElement(I.a.Item,{key:"2"},i.a.createElement(y.b,{to:"/users"},i.a.createElement(q.a,null),"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438")),i.a.createElement(I.a.Item,{key:"3"},i.a.createElement(y.b,{to:"/proxies"},i.a.createElement(A.a,null),"\u041f\u0440\u043e\u043a\u0441\u0438")),i.a.createElement(I.a.Item,{key:"4"},i.a.createElement(y.b,{to:"/settings"},i.a.createElement(J.a,null),"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438")),i.a.createElement(I.a.Item,{key:"5"},i.a.createElement(y.b,{href:"/logout"},i.a.createElement(K.a,null),"\u0412\u044b\u0439\u0442\u0438")))}}]),a}(i.a.Component),G=a(30),Z=a.n(G),$=a(62),ee=a(55),te=a.n(ee);function ae(e){return function(t){return t({type:"REQ_PROXY"}),te.a.get(e).then((function(e){t({type:"RECV_PROXY",data:e.data})})).catch((function(e){console.log(e)}))}}w.a.Option;var ne={labelCol:{span:8},wrapperCol:{span:16}},re=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(e){var r;return Object(n.a)(this,a),(r=t.call(this,e)).setModalVisible=function(e){r.setState({modal:e})},r.setModalLoading=function(e){r.setState({loading:e})},r.onFinish=function(){var e=Object($.a)(Z.a.mark((function e(t){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.setModalLoading(!0),e.next=3,te.a.post("".concat("","/api/proxies/new"),t.proxy);case 3:e.sent,g.dispatch(ae("".concat("","/api/proxies/"))),r.setModalLoading(!1),r.setModalVisible(!1),r.reset();case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),r.reset=function(){r.formRef.current.resetFields()},r.state={modal:!1,loading:!1},r.formRef=i.a.createRef(),r}return Object(r.a)(a,[{key:"render",value:function(){var e=this;return i.a.createElement(I.a,{theme:"light",mode:"horizontal",style:{lineHeight:"64px"},selectable:!1},i.a.createElement(I.a.Item,{key:"1"},i.a.createElement(L.a,{icon:i.a.createElement(S.a,null),onClick:function(){return e.setModalVisible(!0)}},"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043f\u0440\u043e\u043a\u0441\u0438")),i.a.createElement(_.a,{title:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0433\u043e \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f",wrapClassName:"vertical-center-modal",visible:this.state.modal,confirmLoading:this.state.loading,onCancel:function(){return e.setModalVisible(!1)},cancelText:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c",okText:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c",okButtonProps:{form:"new-proxy",key:"submit",htmlType:"submit"}},i.a.createElement(M.a,Object.assign({},ne,{name:"new-proxy",onFinish:this.onFinish,ref:this.formRef}),i.a.createElement(M.a.Item,{name:["proxy","name"],label:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["proxy","region"],label:"\u0420\u0435\u0433\u0438\u043e\u043d",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["proxy","ip"],label:"IP",rules:[{required:!0}]},i.a.createElement(P.a,null)),i.a.createElement(M.a.Item,{name:["proxy","port"],label:"PORT",rules:[{required:!0}]},i.a.createElement(P.a,null)))))}}]),a}(i.a.Component),oe=a(420),le=a(412),ce=a(413),ie=a(407),se=O.a.Header,ue=O.a.Content,me=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"dataSource",value:function(){return this.props.proxies.data}},{key:"columns",value:function(){var e=this,t=[{title:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",dataIndex:"name",key:"name",sorter:function(e,t){return e.name.length==t.name.length},sortDirections:["descend","ascend"]},{title:"\u0420\u0435\u0433\u0438\u043e\u043d",dataIndex:"region",key:"region",sorter:function(e,t){return e.region.length==t.region.length},sortDirections:["descend","ascend"],render:function(e){return i.a.createElement("span",null,i.a.createElement(le.a,{color:"green",key:e},e))}},{title:"IP",dataIndex:"ip",key:"ip"},{title:"Port",key:"port",dataIndex:"port"},{title:"\u0424\u0443\u043d\u043a\u0446\u0438\u0438",key:"action",render:function(t,a){return i.a.createElement(ce.a,{title:"\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?",cancelText:"\u041d\u0435\u0442",okText:"\u0414\u0430",icon:i.a.createElement(oe.a,{style:{color:"red"}}),onConfirm:function(){return e.handleDelete(a)}},i.a.createElement(L.a,{type:"link",danger:!0},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))}}];return t}},{key:"handleDelete",value:function(){var e=Object($.a)(Z.a.mark((function e(t){return Z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te.a.get("".concat("","/api/proxies/remove/").concat(t._id));case 2:e.sent.data.success&&g.dispatch(ae("".concat("","/api/proxies/")));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return i.a.createElement(O.a,null,i.a.createElement(se,{style:{background:"#fff",padding:0}},i.a.createElement(re,null)),i.a.createElement(ue,{style:{background:"#fff",margin:"16px 12px 0",height:"100%",overflowY:"auto"}},i.a.createElement(ie.a,{dataSource:this.dataSource(),columns:this.columns()})))}}]),a}(i.a.Component);var de=Object(m.b)((function(e){return{proxies:e.proxy}}))(me),pe=O.a.Sider,fe=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"test",value:function(){console.log(this.props.config)}},{key:"render",value:function(){return i.a.createElement(y.a,null,i.a.createElement(O.a,{style:{height:"100%"}},i.a.createElement(pe,{breakpoint:"lg",collapsedWidth:"0",onCollapse:function(e,t){console.log(e,t)},stype:{position:"fixed"}},i.a.createElement(W,null)),i.a.createElement(v.a,{exact:!0,path:"/home",component:k}),i.a.createElement(v.a,{path:"/users",component:B}),i.a.createElement(v.a,{path:"/proxies",component:de}),i.a.createElement(v.a,{path:"/settings",component:R})))}}]),a}(i.a.Component);var Ee=Object(m.b)((function(e){return{config:e.config,files:e.files,user:e.user}}))(fe);a(404);var he=document.getElementById("root");function be(){var e;g.dispatch(ae("".concat("","/api/proxies"))),g.dispatch((e="".concat("","/api/users"),function(t){return t({type:"REQ_USER"}),te.a.get(e).then((function(e){t({type:"RECV_USER",data:e.data})})).catch((function(e){console.log(e)}))}))}var ge=function(e){Object(o.a)(a,e);var t=Object(l.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){be(),console.log("Loading data...")}},{key:"render",value:function(){return i.a.createElement(m.a,{store:g},i.a.createElement(Ee,null))}}]),a}(i.a.Component);u.a.render(i.a.createElement(ge,null),he)}},[[211,1,2]]]);
//# sourceMappingURL=main.7f167ec6.chunk.js.map