import{createApp} from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2/'; // 請加入站點
const path = 'wlc606'; // 請加入個人 API Path

let productModal = "";
let delProductModal = "";

const app = {
  data(){
    return{
      product:[],
      template:{        
        imagesUrl:[],
      },      
      isNew:false // 確認是編輯或新增所使用 
    }
  },
  methods:{   
    getProduct(){
      axios.get(`${url}api/${path}/admin/products/all`)
      .then(res=>{
        console.log(res.data.products);
        this.product = res.data.products;  
        console.log(this.product);      
      })
      .catch(error=>{
        console.dir(error);
      })
    },
    //新增 post
    updateProduct(){
      let httpMethod = 'post';
      let api = `${url}api/${path}/admin/product`;
      //編輯 put     
      if(!this.isNew){
        httpMethod = 'put';
        api = `${url}api/${path}/admin/product/${this.template.id}`
      }
      axios[httpMethod](api,{ data: this.template })
      .then(res=>{        
        productModal.hide();
        alert('新增成功');
        this.getProduct();
      })
      .catch(error=>{        
        alert('新增失敗，請重新檢視'); 
        console.dir(error);
      })      
    },

    //刪除
    delProduct(){
      axios.delete(`${url}api/${path}/admin/product/${this.template.id}`)
      .then(res=>{               
        delProductModal.hide();           
        this.getProduct();
      })
      .catch(error=>{
        alert('刪除失敗');
        console.dir(error);
      })
    },
   
    //打開Modal 新增or編輯
    openModel(status,item){
      productModal = new bootstrap.Modal('#productModal');
      delProductModal = new bootstrap.Modal('#delProductModal');
      if(status==='create'){ 
        this.template = {        
          imagesUrl:[],
        };
        this.isNew = true;
        productModal.show();
      }
      else if(status==='edit'){
        productModal.show();
        this.template = {...item};
      }
      else if(status==='del'){
        delProductModal.show();
        this.template = {...item};
      }
    },
    
  },
  mounted(){
    //取出token
     const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');    
     //預設token帶入header    
     axios.defaults.headers.common.Authorization = token;        
    //  console.log(token);
    this.getProduct();   
  },  
}

createApp(app).mount('#app');



