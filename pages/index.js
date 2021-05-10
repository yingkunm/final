import React,{Component} from "react"
import http from "@http"
import Router from 'next/router'
import { Toast, ListView,} from 'antd-mobile';
import Head from '../components/Head/head1'

function intervalTime(startTime,endTime) {
  var date3 =  (endTime- startTime)*1000; 
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  var leave1 = date3 % (24 * 3600 * 1000); 
  var hours = Math.floor(leave1 / (3600 * 1000));
  var leave2 = leave1 % (3600 * 1000); 
  var minutes = Math.floor(leave2 / (60 * 1000));
  var leave3 = leave2 % (60 * 1000); 
  var seconds = Math.round(leave3 / 1000);
  if(days > 0){
      return days + "天"
  }
  else if(hours > 0){
      return hours + "小时"
  }
  else if(minutes > 0){
      return minutes + "分钟"
  }
  else{
      return seconds + "秒"
  }
}
class NewsList extends Component{
  constructor(props){
    super(props);
    const list=this.props.list;
      this.state={
      isLoading:false,
      list:list,
      page:2,
      hasMore:true,
      dataSource:new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(list)
    }
  }
  handleJump(item){
      Router.push('/detail?id='+item.item_id)
  }
  onEndReached (){
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true ,page: this.state.page+1});
    this.getData()
  }

  getData(){
    const behot_time = this.state.list[this.state.list.length - 1] ? this.state.list[this.state.list.length - 1].behot_time : (new Date().getTime()-2*60*60*1000).toString().substring(0,10);
    http.get(`/api/list/`, {
      params: {
        tag: '__all__',
        ac: 'wap',
        count: '20',
        format: 'json_raw',
        as: 'A1750EBF6820180',
        cp: '5EF860E1D8F03E1',
        max_behot_time: behot_time,
        _signature: 'zzhYuAAAkcgoT6C-L.hV.s84WK',
        i: behot_time,
        page: this.page
      }
    }).then((res)=>{
      const _data=res.data;
      if(_data.data && _data.has_more){
        const arr=[...this.state.list,..._data.data||[]];
        this.setState({
          hasMore:arr.length>0,
          isLoading:false,
          list:arr,
          dataSource: this.state.dataSource.cloneWithRows(arr)
        })
      }
      else{
        Toast.info(_data.message)
      }
    })
  }
  render(){
    const row=(item,index)=>{
      return item.image_list && item.image_list.length>0?(
      <li className="article-list-item" key={index} onClick={()=>this.handleJump(item)}>
        <div className="cont">
          <p>{item.title}</p>
          <div className="img-arr">
          {
            item.image_list.map((sitem,sindex)=>{
              return <div className="pic" key={sindex} ><img src={sitem.url} alt="img"/></div>
            })
          }
          </div>
          <ul className="tag-btm">
            <div className="nums">
              <b>
                <em className="tag">{item.media_name}</em>
                <em className="read"> ⋅ {item.comment_count}评论 ⋅  </em>
                </b>
                <em className="time">{item.datetime}</em>
              </div>
          </ul>
        </div>
      </li>
      ):(
      <li className="article-list-item" key={index} onClick={()=>this.handleJump(item)}>
        {item.large_image_url?<div className="pic"><img src={item.large_image_url} alt="img" /></div>:<></>}
        <div className="cont">
          <p>{item.title}</p>
          <ul className="tag-btm">
            <div className="nums"><b><em className="tag">{item.media_name}</em><em className="read"> ⋅ {item.comment_count}评论 ⋅  </em></b> <em className="time">{item.datetime}
              </em></div>
          </ul>
        </div>
      </li>
      )
    };
    return(
      <div>
        <div className="base">
        <Head/>
        <div className="column-wrap">
          <div className="art-list">
            <ListView
            dataSource={this.state.dataSource}
            renderFooter={() => (
            <div style={{ padding: 0, textAlign: 'center',fontSize:12 }}>
              {this.state.isLoading ? '正在加载...' : this.state.hasMore?'加载完毕...':'-- 已经到底了 --'}
            </div>
            )}
            renderBodyComponent={() => <ul className="article-list-wrap"></ul>}
            renderRow={row}
            style={{
              height: '100vh',
              overflow: 'auto',
            }}
            pageSize={10}
            scrollRenderAheadDistance={500}
            onEndReached={()=>this.onEndReached()}
            onEndReachedThreshold={10}
          />
          </div>
        </div>
        <style jsx>{
        `.mint-spinner-fading-circle {
            margin: 0 auto;
          }
          .column-wrap{
            background:#fff;
          }
          .finish-tips {
            text-align: center;
            height: 20px;
            line-height: 20px;
            color: #7e7e7e;
          }
          .base {
            font: 12px/1.14 PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,Helvetica Neue,Arial,sans-serif;
            background: #ffffff;
            margin: 0; 
            padding: 0;
            text-align: center;
            color: #000000;
          }
          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            
            align-items: center;
            height: 100vh;
          }
          a:link {color: #000000;}
          a:visited {color: #999;} 
          a:hover {color: #406599;} 
          
          .link{
              text-decoration: none;
          }
          .clear{
            clear:both;
          }`
        }
        </style>
      </div>
      </div>
    )
  }
}
NewsList.getInitialProps = async ({ query }) => {
  const behot_time=(new Date().getTime()-2*60*60*1000).toString().substring(0,10)
     const res = await http.get(process.browser?`/api/list/`:`/list/`, {params: {
      tag: '__all__',
      ac: 'wap',
      count: '20',
      format: 'json_raw',
      as: 'A1750EBF6820180',
      cp: '5EF860E1D8F03E1',
      max_behot_time: behot_time,
      _signature: 'zzhYuAAAkcgoT6C-L.hV.s84WK',
      i: behot_time,
      page: 1
    }});
    return {  
      list:res.data.data||[],
    }
}
export default NewsList;