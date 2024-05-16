import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

  static defaultProps = {
    country : 'in' ,
    pageSize : 5,
    category : 'general'
    

  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  };

    constructor(props){
        super(props);
        console.log("hello i am a constructor from News component");
        this.state = {
            articles : [],
            loading : false,
            page :1,
            totalArticles:0

        }
        document.title = `${this.props.category} - newsStream ` ;
    }

    async updateNews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3851c526dcb247d7b01f3c12430aeb19&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles : parsedData.articles,
       totalArticles: parsedData.totalResults})

    this.props.setProgress(100);


    }


    async componentDidMount(){
          // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3851c526dcb247d7b01f3c12430aeb19&page=1&pageSize=${this.props.pageSize}`;
          // let data = await fetch(url);
          // let parsedData = await data.json()
          // console.log(parsedData);
          // this.setState({articles : parsedData.articles, totalArticles: parsedData.totalResults})
      this.updateNews();

    }


     handelprevClick = async ()=>{

      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3851c526dcb247d7b01f3c12430aeb19&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
      //     let data = await fetch(url);
      //     let parsedData = await data.json()
      //     console.log(parsedData);
         
      // this.setState({
      //   page:this.state.page - 1,
      //   articles : parsedData.articles
      // })

      this.setState({
          page:this.state.page - 1,
        })
      this.updateNews();


    }
    
     handelnextClick = async ()=>{
      // console.log("next");
      // if(this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize) ){
      //   console.log("did not found anything")
      // }
      // else{

      //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3851c526dcb247d7b01f3c12430aeb19&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      //     let data = await fetch(url);
      //     let parsedData = await data.json()
      //     console.log(parsedData);
          
      //     this.setState({
      //       page:this.state.page + 1,
      //       articles : parsedData.articles
      //     })
      // }
      this.setState({
        page:this.state.page + 1,
      })
      this.updateNews();
    }

    fetchMoreData = async() => {
      
      this.setState({page: this.state.page+1})
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3851c526dcb247d7b01f3c12430aeb19&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({articles : this.state.articles.concat(parsedData.articles),
       totalArticles: parsedData.totalResults})

    };

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>NewsStream - Top headlines</h2>

      <InfiniteScroll
          dataLength={this.state.articles.length}
          
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalArticles}
          loader={<h4>Loading...</h4>}
        >
      <div className="conatiner">
        
        <div className="row">

          {this.state.articles.map((element)=>{
          return    <div className="col-md-4" key={element.url}>
                      <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
          })}
            
        </div>
        </div>  
      </InfiniteScroll>
      {/* logic for previous next button  */}
        {/* <div className="contanier d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handelprevClick} > &larr; Previous</button>
        <button disabled={this.state.page  === Math.ceil(this.state.totalArticles/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handelnextClick} >Next  &rarr; </button>
        </div> */}

        
      </div>
    )
  }
}

export default News
