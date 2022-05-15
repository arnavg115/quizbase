import { cacheExchange, createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";



const serverSide = ()=>(typeof window === "undefined");
const ssrCache = ssrExchange({isClient:!serverSide()})
const client = createClient({
    url:"http://localhost:8000/graphql",
    exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
})


export {client, ssrCache}