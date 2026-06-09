# Alterações para deixar o projeto funcional com backend

## 1. Backend
Crie uma pasta `backend/` no projeto e adicione os arquivos `package.json`, `server.js` e `db.json` gerados aqui.

### Rodar backend
```bash
cd backend
npm install
npm run dev
```
Servidor: `http://localhost:3001`

Login admin inicial:
- email: `admin@techstore.com`
- senha: `admin123`

## 2. Frontend
Substitua os arquivos abaixo pelos gerados:
- `src/services/productService.js`
- `src/context/AuthContext.jsx`
- `src/context/ProductsContext.jsx`
- `src/pages/Register.jsx`

## 3. Ajustes em arquivos existentes
### `src/App.jsx`
- importe `Register` e crie a rota `/cadastro`
- mantenha `ProtectedRoute` em `/admin-produtos`

Trecho:
```jsx
import Register from './pages/Register'
<Route path="/cadastro" element={<Register />} />
```

### `src/pages/Login.jsx`
- adicione link para cadastro abaixo do formulário:
```jsx
<p className="login-back">
  <Link to="/cadastro">Criar conta</Link>
</p>
```

### `src/components/ProductForm.jsx`
- troque o `onSubmit({...})` por `FormData`, porque agora o backend usa Multer:
```jsx
const form = new FormData()
form.append('title', formData.title)
form.append('name', formData.title)
form.append('price', Number(formData.price))
form.append('category', formData.category)
form.append('description', formData.description)
if (imageMode === 'upload' && fileInputRef.current?.files?.[0]) {
  form.append('image', fileInputRef.current.files[0])
}
if (imageMode === 'url') {
  form.append('imageUrl', formData.image)
}
onSubmit(form)
```

### `src/pages/Home.jsx`
- deixe de importar `data/products` e use `useProductsContext()` para exibir os produtos reais do backend.

### `src/data/products.js`
- pode manter só se quiser dados iniciais locais; com backend, ele deixa de ser obrigatório.

## 4. Observações importantes
- O PDF da aula mostra uso de **Multer**, filtro de tipo de arquivo, limite de 5MB, `Authorization: Bearer token` e backend `server.js`, então esta solução está alinhada com o material visto em aula.
- O backend criado usa `Express`, `JWT`, `bcryptjs` e `Multer`, com upload salvo em `backend/uploads/`.
- A API tem rotas de login, cadastro, leitura do usuário logado, listagem de produtos, criação de produto e exclusão.
