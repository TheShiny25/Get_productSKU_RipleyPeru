import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';
import "../assets/css/style.css";

const eject_swiper = () => {
  var swiper = new Swiper(document.getElementById('list_product_sku'), {
    /*effect: "coverflow",*/
    spaceBetween: 0,
    centeredSlides: false,
    slidesPerView: 6,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next.swiper-next1",
      prevEl: ".swiper-button-prev.swiper-prev1",
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      // when window width is >= 480px

      480: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      // when window width is >= 768px
      768: {
        slidesPerView: 4,
        spaceBetween: 0,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 6,
        spaceBetween: 0,
      },
    },
  });
};

const list_product = () => {
    try {
      /*let apiProUrl = "https://simple.ripley.com.pe/api/products/";*/
      let apiProUrl = "https://staging.ripley.com.pe/api/products/";
      let infoProduct = document.querySelectorAll(".skuProductApi");
      let cantProductSku = infoProduct.length;
      let productInsertado = 0;
      infoProduct.forEach(async (button, index) => {
        let productSKU = button.getAttribute("data-prod-sku");
        let productImg_Pro = parseInt(button.getAttribute('data-pro-pos_img'));
        let response = await fetch(
          `https://staging.ripley.com.pe/api/products/${productSKU}`
        );
        let data = await response.json();
        let productInfo = "";
  
        /*Captura de Datos*/
        const idCorta = String(data.uniqueID);
        const idLarga = String(data.partNumber);
  
        const nombreProducto = String(data.name);
        const descripcionCorta = String(data.shortDescription);
        const descripcionlarga = String(data.longDescription);
  
        const urlProducto = String(data.url);
  
        const precioNormal = String(data.prices.formattedListPrice);
        const precioInternet = String(data.prices.formattedOfferPrice);
        const precioOpex = String(data.prices.formattedCardPrice);
        const totalDescuento = String(data.prices.formattedDiscount);
  
        var precioNormalNoformat = parseInt(data.prices.listPrice);
        var preciointernetNoformat = parseInt(data.prices.offerPrice);
        var precioOpexNoformat = parseInt(data.prices.cardPrice);
  
        const porcentajeDescuento = parseInt(data.prices.discountPercentage);
        const puntosRipley = parseInt(data.prices.ripleyPuntos);
  
        const imagenThumbnail = String(data.thumbnailImage);
        const imagenCompleta = String(data.fullImage);
        const imagePosition = data.images;
  
        const esMarketplace = Boolean(data.isMarketplaceProduct);
        const esSinStock = Boolean(data.isOutOfStock);
        const esNoDisponible = Boolean(data.isUnavailable);
      

        /*console.log(idCorta);
          console.log(idLarga);
          console.log(nombreProducto);
          console.log(descripcionCorta);
          console.log(descripcionlarga);
          console.log(urlProducto);
          console.log(precioNormal);
          console.log(precioInternet);
          console.log(precioOpex);
          console.log(totalDescuento);
          console.log(precioNormalNoformat);
          console.log(preciointernetNoformat);
          console.log(precioOpexNoformat);
          console.log("porcentaje de descuento" + porcentajeDescuento);
          console.log(puntosRipley);
          console.log(imagenThumbnail);
          console.log(imagenCompleta);
          console.log(esMarketplace);
          console.log(esSinStock);
          console.log(esNoDisponible);*/
  
        /*Fin - Captura de Datos*/
        productInfo = `<a href="${urlProducto}" target="_top" sku_producto='${idCorta}'>
                                ${
                                  porcentajeDescuento != 0
                                    ? `<span class="wrap-porcent-desct">-${porcentajeDescuento}%</span>`
                                    : ``
                                }
                              <div class="wrap-img">
                                ${productImg_Pro != 0
                                  ?`<img loading="lazy" class="lazyload" data-src="${String(imagePosition[productImg_Pro])}" alt="">`
                                  :`<img loading="lazy" class="lazyload" data-src="${imagenThumbnail}" alt="">`
                                }
                              </div>
                              <div class="wrap-infoPro">
                                  <p class="wrap-description">
                                      ${nombreProducto}
                                  </p>
                                  
                                  ${
                                    isNaN(precioOpexNoformat)
                                      ? `<span class="wrap-price-oferta best-price"><span class="pre_internet">${precioInternet}</span></span>
                                      <span class="wrap-price-normal">Antes: <span class="pre_normal">${precioNormal}</span></span>
                                      <span class="wrap-price-aon"><span class=""></span></span>`
                                      : `<span class="wrap-price-aon best-price"><span class="aon">${precioOpex}</span></span>
                                      <span class="wrap-price-oferta">Oferta: <span class="pre_internet">${precioInternet}</span></span>
                                      <span class="wrap-price-normal">Antes: <span class="pre_normal">${precioNormal}</span></span>`
                                  }
                                  
                                  
                              </div>
                          </a>`;
  
        document.getElementsByClassName("skuProductApi")[index].innerHTML = productInfo;
        productInsertado += 1;
        /*console.log("Producto Insertado - Sku: " + productInsertado);*/
        if (productInsertado == cantProductSku) {
          /*console.log("Ejecutar Carrusel -->");*/
          setTimeout(function () {
            eject_swiper();
          }, 1200);
          /*console.log("carrusel Ejecutado - webpack menor peso v2");*/
        }
      });
      /*console.log("cantidad de productos - Sku: " + cantProductSku);*/
    } catch (error) {
      console.log("Error ==> ", error);
    }
  };
  
  list_product();
  