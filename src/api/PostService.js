import axios from "axios";

export default class PostService {
    static async getAll() {
        return await axios.get('/posts')
    }

    static async create(data = {}) {
        return await axios.post('/posts', data)
    }

    static async update(id, data = {}) {
        return await axios.put(`/posts/${id}`, data)
    }

    static async remove(id) {
        return await axios.delete(`/posts/${id}`)
    }
}