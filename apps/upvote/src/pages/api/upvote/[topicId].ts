import {NextApiHandler} from "next";
import {createSupabaseClient} from "@/lib/supabaseUtils";

const handler: NextApiHandler = async (req, res) => {
    const upvote: boolean = req.body.upvote
    const topicId: string = req.query.topicId as string

    const supabaseClient = createSupabaseClient()

    const topic = await supabaseClient.from("topics")
        .select("id, likes")
        .eq("id", topicId)
        .maybeSingle()
        .then(({data}) => {
            return data
        })

    if (topic == null) return res.status(400).end()

    let {likes} = topic

    likes = upvote ? likes + 1 : likes - 1

    await supabaseClient.from("topics")
        .update({likes})
        .eq("id", topicId)
        .then(({error, data}) => {
            if (error) throw error
        })

    res.json({success: true})
}

export default handler