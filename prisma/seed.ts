import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
//async function main(){
// for (let users in user){
// await prisma.product.create({
//     data:product
// })
// }
// }

// main().catch(e=>{
//     console.log(e)
//     process.exit(1)

// }).finally(()=>{
//     prisma.$disconnect
// })

//command line for the seeding
//npx prisma db seed --preview-feature
