$(document).ready(chargementJSON);


var montantTotal = 0;
var laCouleur;
var monPanier = {produit: []};


$("ul.cd-container li").each(function (i) {


    var objet = $(this);


    var divPanCouleur = objet.find(".panelCouleur");
    var panelChoixCouleur = objet.find(".panelChoixCouleur");


    objet.find(".btnChoixCouleur").click(function () {

        objet = $(this);

        if (panelChoixCouleur.is(':hidden')) {

            if (objet.hasClass("flash")) {


                objet.removeClass("flash").addClass("normal");

            }

            objet.text("Masquer");
            panelChoixCouleur.slideDown(300, "linear");

        } else {

            if (!objet.hasClass("flash")) {


                objet.addClass("flash").removeClass("normal");


            }

            objet.text("Choix couleur");
            panelChoixCouleur.slideUp(300, "linear");
        }

    });

    objet.delay(200 * i).fadeIn(900);
    divPanCouleur.delay(200 * i).slideDown(900);
    objet.find("select").colorSelect();

    /**
     * quand on clique sur une couleur
     */

    $(panelChoixCouleur).find(".color-select-option").click(function () {

        objet = $(this);
        laCouleur = objet.data("color");
        couleurImage(laCouleur, objet);


    });

    function couleurImage(c, selecteur) {
        switch (c) {
            case undefined :
                return "rouge";
                break;
            case "#ff0b00" :
                selecteur.parents("li").find("img.img_produit").attr("src", "img/" + i + "_rouge.png");
                return "Rouge";
                break;
            case "#1930BB" :
                selecteur.parents("li").find("img.img_produit").attr("src", "img/" + i + "_bleu.png");
                return "Bleu";
                break;
            case "#05DE17" :
                selecteur.parents("li").find("img.img_produit").attr("src", "img/" + i + "_vert.png");
                return "Vert";
                break;

        }

    }


    var prixUpdate = 0;
    objet.find(".btn-panier").click(function () {
        $("#cd-shadow-layer").addClass("is-visible");
        $("#cd-cart").addClass("speed-in");


        var libelle = $(this).parents(".panelCouleur").find("h4.libArticle").text();
        var prix = parseInt($(this).parents(".panelCouleur").find("span.prix").text()); // prix de l'article
        var couleurChoisie = couleurImage(laCouleur, objet);

        console.log("coleur choisie :" + couleurChoisie);
        monPanier.produit.push({libelle: libelle, prix: prix, couleur: couleurChoisie});

        for (var j = monPanier.produit.length - 1; j > 0; j--) {

            console.log(monPanier.produit[j]);
            if (monPanier.produit[j].libelle === libelle) {
                console.log("splice");
                prixUpdate += monPanier.produit[j].prix;

                // monPanier.produit.push({libelle: libelle, prix: prixUpdate});
                monPanier.produit.splice(j - 1, 1);


            } else {
                console.log("pouce");
                monPanier.produit.push({libelle: libelle, prix: prix, couleur: couleurChoisie});


            }

        }
        majPanier(monPanier.produit);

        // console.log("\n\nFIN : " + monPanier.produit.length);


    });


});
$("body").on("click", ".btn-panier", itemSupprimable);

function majPanier(tab) {


    var occurences = 0;

    for (var i = 0; i < tab.length; i++) {
        console.log(tab[i].couleur);
        montantTotal += tab[i].prix;

        $(".cd-cart-items").append('<li>' + tab[i].libelle + ' ' + tab[i].couleur +
            '<div class="cd-price">' + tab[i].prix + ' €</div>\
       <a href="#0" class="cd-item-remove cd-img-replace">Supprimer</a>\
           </li>');
    }


    $(".cd-cart-total span").text(montantTotal + " €");

}

function itemSupprimable() {

    $(".cd-cart-items li").each(function (iter) {
        console.log("ok");
        $(this).find(".cd-item-remove").click(function () {
            console.log("o3k");
            monPanier.produit.splice(iter, 1);

        });
    });


}
$(function () {
    $('ul.cd-container li > img').okzoom({
        width: 160,
        height: 160,
        round: true,
        shadow: "0 0 6px #000",
        border: "1px solid black"
    });


});


function chargementJSON() {

    $.ajax({
        type:"GET",
        dataType: "xml",
        url: "lib/produits.xml",
        success: function (xml) {

            $(xml).find("produit").each(function (i) {
                console.log(xml);
                var prix =$(this).find("prix").text();
                var libArt= $(this).find("lib").text();
                var gallerie= $("#cd-gallery-items");
                gallerie.append('<li>\
                    <img class="img_produit" src="img/' + i + '_rouge.png" alt="Preview image">\
                    <div class="panelCouleur">\
                    <span class="prix">' +prix  + '</span><span class="devise">€</span>   <h4 class="libArticle">' +libArt + '</h4>\
                    <div class="bloc1">\
                    <a class="btn btn-success btn-panier" href="#"><span class="glyphicon glyphicon-shopping-cart"></span> +</a>\
                    </div>\
                <div class="bloc2">\
                    <button type="button" class="btn btn-labeled btnChoixCouleur flash">\
                    <span class="btn-label"><i class="glyphicon glyphicon-chevron-right"></i></span>\
                    Choix couleur\
                </button>\
                <div class="panelChoixCouleur">\
                    <select class="color-select">\
                    <optgroup>\
                    <option value="#ff0b00">ROUGE</option>\
                    <option value="#1930BB">BLEU</option>\
                    <option value="#05DE17">VERT</option>\
                    </optgroup>\
                    </select>\
                    </div>\
                    </div>\
                    </div>\
                    </li>');

                gallerie.find("li").delay(200 * i).fadeIn(900);
                gallerie.find(".panelCouleur").delay(300 * i).slideDown(900);

            });



        }
    });


}


