export default function head1() {
    return (
    <div>   
        <div className="head">
            <div className="header">
                <img src="/xin.png" className="img1"/>
                <img src="/zi.png" className="img2"></img>
                <img src="/sousuo.jpg" className="img3"></img>
            </div>
            <div className="navbar">
                <ul className="nav">
                    <a className="first">推荐&nbsp;</a>
                    <a className="a">视频&nbsp;</a>
                    <a className="a">热点&nbsp;</a>
                    <a className="a">社会&nbsp;</a>
                    <a className="a">娱乐&nbsp;</a>
                    <a className="a">军事&nbsp;</a>
                    <a className="a">科技&nbsp;</a>
                    <a className="a">汽车&nbsp;</a>
                    <a className="a">房产&nbsp;</a>
                    <a className="a">家居&nbsp;</a>
                    
                </ul>
            </div>
        </div>
        <style jsx>{
            `
            .head{
                background-color: rgb(211, 60, 60);
                height: 90px;
                width:100%;
                position:fixed;
            }
            .header {
                display: flex;
                justify-content: space-between;
                height: 50px;
            }
            .img1{
                margin: 5px;
                float: left;
                width: initial;
            }
            .img2{
                margin: 5px;
                margin: auto;
            }
            .img3{
                margin: 5px;
                float: right;
            }
            .navbar{
                background-color: rgb(244 245 246);
                height:40px;
            
            }
            .nav {
                display: flex;
                overflow: auto;
                margin: auto ;
                padding-left: 5px;
                height: max-content;
                
              }
            .nav.li {
                display: flex;
                flex-direction: row;
                
              }
            .a {
                
                white-space: nowrap;
                display: inline-block;
                padding-left: 10px;
                padding-right: 10px;
                color: #505050;
                text-decoration: none;
                font-size: 17px;
                line-height: 26px;
                height: 26px;
                font-weight: 400;
                margin-left: 5px;
                margin-top: 5px;
                margin-bottom: 5px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
              }
            
            .first {
                color: #f85959;
                white-space: nowrap;
                display: inline-block;
                padding-left: 10px;
                padding-right: 10px;
                font-weight: 500;
                text-decoration: none;
                font-size: 17px;
                line-height: 26px;
                height: 26px;
                margin-left: 5px;
                margin-top: 5px;
                margin-bottom: 5px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
              }
            
              .top_menu_bar .top_menu_list .btn {
                white-space: nowrap;
                display: inline-block;
                padding-left: 10px;
                padding-right: 10px;
                color: #505050;
                text-decoration: none;
                font-size: 17px;
                line-height: 26px;
                height: 26px;
                margin-left: 5px;
                margin-top: 5px;
                margin-bottom: 5px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
              }
            
            `
        }</style>
    </div> 
    )
}