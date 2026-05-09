(function () {
    const translations = {
        // común
        "网易云音乐": "Música Netease",
        "酷我音乐": "Música Kuwo",
        "JOOX音乐": "Música JOOX",
        "哔哩哔哩": "Bilibili",
        "极高音质": "Calidad Alta",
        "标准音质": "Calidad Estándar",
        "高品音质": "Alta Calidad",
        "无损音质": "Sin Pérdida",
        "歌词将在此处同步显示": "La letra se mostrará aquí de forma sincronizada",
        "Made by Wet Dream Boy，免费API来自GD音乐台(music.gdstudio.xyz)，仅供学习交流使用，请支持正版音乐奥！": "Hecho por Wet Dream Boy. API gratuita de GD Music (music.gdstudio.xyz). Solo para uso educativo, ¡apoya la música oficial!",

        // index.html
        "探索雷达": "Explorar Radar",
        "打开搜索": "Abrir Búsqueda",
        "切换深浅色模式": "Cambiar Tema",
        "关闭搜索": "Cerrar Búsqueda",
        "搜索歌曲、歌手或专辑...": "Buscar canciones, artistas o álbumes...",
        "搜索": "Buscar",
        "导入已选": "Importar Selección",
        "导入到播放列表": "Importar a Lista de Reproducción",
        "导入到收藏列表": "Importar a Favoritos",
        "轻触返回封面": "Toca para volver a la portada",
        "选择一首歌曲开始播放": "Selecciona una canción para empezar",
        "未知艺术家": "Artista Desconocido",
        "收藏当前歌曲": "Añadir canción a favoritos",
        "播放列表": "Lista de Reproducción",
        "收藏列表": "Favoritos",
        "播放列表操作": "Opciones de Lista",
        "导入播放列表": "Importar Lista",
        "导出播放列表": "Exportar Lista",
        "清空播放列表": "Vaciar Lista",
        "收藏列表操作": "Opciones de Favoritos",
        "全部添加到播放列表": "Añadir todo a la Lista",
        "导入收藏列表": "Importar Favoritos",
        "导出收藏列表": "Exportar Favoritos",
        "清空收藏列表": "Vaciar Favoritos",
        "收起播放面板": "Minimizar Panel",
        "播放模式": "Modo de Reproducción",
        "上一曲": "Anterior",
        "播放 / 暂停": "Reproducir / Pausar",
        "下一曲": "Siguiente",
        "打开播放列表": "Abrir Lista de Reproducción",
        "随机播放": "Aleatorio",
        "切换随机播放": "Activar/Desactivar Aleatorio",
        "聚合所有雷达，探索新音乐": "Agrega todos los radares, descubre música nueva",

        // login.html
        "登录 - Solara": "Iniciar Sesión - Solara",
        "访问受到保护": "Acceso Protegido",
        "访问口令": "Contraseña de Acceso",
        "请输入密码": "Introduce la contraseña",
        "只有输入了正确口令的成员才能继续访问内容。": "Solo los miembros con la contraseña correcta pueden acceder al contenido.",
        "进入 Solara": "Entrar a Solara",
        "安全状态：受保护": "Estado de Seguridad: Protegido",
        "密码错误，请重试": "Contraseña incorrecta, inténtalo de nuevo",
        "登录出错，请稍后再试": "Error al iniciar sesión, inténtalo más tarde",

        // cadenas dinámicas de JS
        "未知歌曲": "Canción Desconocida",
        "未知专辑": "Álbum Desconocido",
        "单曲循环": "Repetir Canción",
        "列表循环": "Repetir Lista",
        "已添加到播放列表": "Añadido a la Lista de Reproducción",
        "已添加到收藏": "Añadido a Favoritos",
        "已从收藏移除": "Eliminado de Favoritos",
        "获取歌词失败": "Error al obtener la letra",
        "暂无歌词": "Letra no disponible",
        "纯音乐，请欣赏": "Música instrumental, ¡disfrútala!",
        "获取播放列表失败": "Error al obtener la lista de reproducción",
        "网络错误，请稍后重试": "Error de red, inténtalo más tarde",
        "播放列表已清空": "Lista de reproducción vaciada",
        "收藏列表已清空": "Favoritos vaciados",
        "不支持导入此格式的播放列表": "Formato de lista no compatible",
        "解析播放列表文件失败": "Error al leer el archivo de la lista",
        "导入成功": "Importación exitosa",
        "导出成功": "Exportación exitosa",
        "复制失败": "Error al copiar"
    };

    window.t = function (str) {
        if (window.SITE_LANGUAGE !== 'ESP') return str;
        return translations[str] || str;
    };

    if (window.SITE_LANGUAGE === 'ESP') {
        document.documentElement.lang = 'es';
        const translateNode = (node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.nodeValue.trim();
                if (text && window.t(text) !== text) {
                    node.nodeValue = node.nodeValue.replace(text, window.t(text));
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

                const placeholders = ['placeholder', 'title', 'aria-label'];
                placeholders.forEach(attr => {
                    if (node.hasAttribute(attr)) {
                        const val = node.getAttribute(attr);
                        if (val && window.t(val) !== val) {
                            node.setAttribute(attr, window.t(val));
                        }
                    }
                });
                
                if (node.tagName === 'TITLE') {
                    const titleText = node.textContent.trim();
                    if (titleText && window.t(titleText) !== titleText) {
                        node.textContent = window.t(titleText);
                    }
                }
                
                node.childNodes.forEach(translateNode);
            }
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(translateNode);
                } else if (mutation.type === 'characterData') {
                    const text = mutation.target.nodeValue.trim();
                    if (text && window.t(text) !== text) {
                        observer.disconnect();
                        mutation.target.nodeValue = mutation.target.nodeValue.replace(text, window.t(text));
                        observer.observe(document.body || document.documentElement, { childList: true, subtree: true, characterData: true });
                    }
                }
            });
        });

        const initTranslation = () => {
            translateNode(document.documentElement);
            observer.observe(document.body || document.documentElement, { childList: true, subtree: true, characterData: true });
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initTranslation);
        } else {
            initTranslation();
        }
    }
})();
