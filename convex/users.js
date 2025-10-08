import { mutation, query } from "./_generated/server";
import {v} from "convex/values";


export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string(),
        token: v.optional(v.number())
    },
    handler: async(ctx, args) => {
        // if user already exists
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect()
        console.log(user)
        // if users doesn't exists, then add new user
        if(user?.length == 0){
            const result = await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                picture: args.picture,
                uid: args.uid,
                // token: args.token ?? 50000
                token: typeof args.token === 'number' && !isNaN(args.token) ? args.token : 50000
            });
            console.log(result)
        }
    }
})

export const GetUser = query({
    args: {
        email: v.string()
    },
    handler: async(ctx, args) => {
        const user = await ctx.db.query('users').filter((q) => q.eq(q.field('email'), args.email)).collect()
        console.log(user)
        return user[0];
    }
})

export const UpdateToken = mutation({
    args:{
        token: v.number(),
        userId: v.id('users')
    },
    handler: async(ctx, args) => {
        const result = await ctx.db.patch(args.userId,{
            token: args.token
        });
        return result;
    }
})