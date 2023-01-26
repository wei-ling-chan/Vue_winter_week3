import{createApp} from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
const app = {
  data(){
    return{
      user : {
            username:'',
            password:''
          }  
    }
  },
  created(){
    
  },
  methods:{
    login(){      
      const url = 'https://vue3-course-api.hexschool.io/v2/'; // 請加入站點
      const path = 'wlc606'; // 請加入個人 API Path
      //1.發送 API 至遠端並登入（並儲存 Token）
      axios.post(`${url}admin/signin`,this.user)
      .then(res=>{      
        const {token,expired} =res.data;
        console.log(token,expired);
        //儲存cookie      
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`; 
        

        //轉址
        window.location = 'modal.html';           
      }).catch(error=>{
        alert('輸入錯誤，請重新登入');
        this.user = {
          username : '',
          password : ''
        }              
      })   
    }
  }
}

createApp(app).mount('#app');




const url = 'https://vue3-course-api.hexschool.io/v2/'; // 請加入站點
const path = 'wlc606'; // 請加入個人 API Path

