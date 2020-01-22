let mongoose = require("mongoose");

//--connection--
mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log(`connected to DB`))
    .catch(error => console.log(`Something went wrong ${error.message}`))

    let authorsSchema = new mongoose.Schema({
        tags : [String],
        date : {type:Date , required:true},
        name : {type:String, required: true},
        author : {type:String, required:true},
        isPublished: {type:Boolean},
        price: {type:Number, required:true}
    });

    let authorsModel = mongoose.model("authors", authorsSchema);

    //----fetch record-----
async function PublishedBackendCourses(){
    let data = await authorsModel
    .find()
    .and([{"tags":"backend"} ,{"isPublished" : true} ])
    .select("name author -_id")
    .sort("name")
    console.log("");
    console.log("----------PublishedBackendCourses--------");
    console.log(data);
}
PublishedBackendCourses();

async function PublishedSortByPrice(){
    let data = await authorsModel
    .find({"isPublished":true})
    .select("author name -_id")
    .sort("-price")
    console.log("");
    console.log("----------PublishedSortByPrice--------");
    console.log(data);
}
PublishedSortByPrice();