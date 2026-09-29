# Panel de administración de Cap Lab

La tienda pública lee el catálogo publicado desde Supabase. El panel privado en `/admin.html` permite iniciar sesión, cargar el catálogo inicial y crear, editar, ocultar o eliminar productos. Las fotos se guardan en Supabase Storage. Los pedidos y las consultas de entrega continúan por WhatsApp.

## Conectar Supabase una sola vez

1. Crea un proyecto en [Supabase](https://supabase.com/dashboard).
2. En **SQL Editor**, abre una consulta nueva, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y ejecútalo. Esto crea la tabla del catálogo, sus reglas de acceso y el espacio público de fotos.
3. En **Authentication → Users**, crea un usuario con tu correo y una contraseña. Desactiva el registro público de usuarios si aparece habilitado; el panel no incluye registro abierto.
4. Copia el `User UID` del usuario que acabas de crear. En **SQL Editor**, autorízalo ejecutando esta consulta y reemplazando el valor:

   ```sql
   insert into public.admin_users (user_id)
   values ('PEGA-AQUI-EL-USER-UID');
   ```

5. En **Project Settings → API**, copia el **Project URL** y la **Publishable key** (en proyectos antiguos puede aparecer como `anon`/public key). Pégalos en `supabase-config.js`:

   ```js
   window.CAP_LAB_SUPABASE_CONFIG = {
     url: "https://TU-PROYECTO.supabase.co",
     publishableKey: "TU-CLAVE-PUBLISHABLE"
   };
   ```

   Esa clave publishable se usa desde el navegador. **Nunca** pegues una clave `service_role` o `secret` en ese archivo. El acceso de escritura está limitado por las políticas de `schema.sql`.

6. Guarda y sube el cambio a GitHub para que Vercel vuelva a desplegar el sitio.

## Primer uso

1. Abre `https://caplab-sigma.vercel.app/admin.html` (o `/admin.html` en tu despliegue) e inicia sesión con el usuario que creaste.
2. Si el catálogo está vacío, pulsa **Cargar catálogo inicial** una vez. Se copian los 25 productos actuales con el precio de muestra y el primer producto marcado como agotado.
3. Pulsa **Editar** para cambiar nombre, estilo, etiqueta, precio, descripción, disponibilidad, visibilidad y fotos. Para añadir más de una foto, selecciona varios archivos en el campo de fotos. Las flechas aparecerán en la tarjeta cuando tenga varias imágenes.
4. Pulsa **Añadir producto** para crear artículos nuevos o **Eliminar** para quitar uno del catálogo.

Los productos ocultos no aparecen en la tienda. Los publicados se muestran después de actualizar la página pública. Las imágenes del catálogo son públicas para que puedan verse sin iniciar sesión; solo una cuenta autorizada puede subirlas, cambiarlas o quitarlas del producto.

## Uso cotidiano

- Entra a `/admin.html` desde cualquier dispositivo, inicia sesión, edita y guarda.
- En la página pública, visitantes solo pueden consultar los productos y escribir por WhatsApp; no pueden modificarlos.
- Los pedidos y la coordinación de entrega siguen gestionándose en WhatsApp.
- Si usas una moneda distinta, cámbiala en cada producto desde el panel.
