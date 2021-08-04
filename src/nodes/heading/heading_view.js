"use strict";

var NodeView = require("lens/article/nodes/node").View;
var $$ = require("lens/substance/application").$$;


// Substance.Heading.View
// ==========================================================================

var HeadingView = function (node, viewFactory) {
    NodeView.call(this, node, viewFactory);

    this.$el.addClass('level-' + this.node.level);
};

HeadingView.Prototype = function () {

    this.render = function () {

        NodeView.prototype.render.call(this);

        
        if (this.isTopLevelHeader()) {
            var titleView = this.createTextPropertyView([this.node.id, 'content'], {
                classes: 'title'
            });
            
            var titleElem = titleView.render().el;
            titleElem.innerText = this.getTopLevelHeaderTitle();
            this.content.appendChild(titleElem);

            if (this.node.getAbstract()) {
                var absView = this.viewFactory.createView(this.node.getAbstract());
                var absViewEL = absView.render().el.querySelector('div.abstract-content');
                this.$el.append(absViewEL)
            }

            return this;
        }


        if (this.node.content.length) {
           
            var titleView = this.createTextPropertyView([this.node.id, 'content'], {
                classes: 'title'
            });

            
            if (this.node.label) {
                
                var labelEl = $$('.label', {text: this.node.label});
                
                this.content.appendChild(labelEl);
            }
            
            this.content.appendChild(titleView.render().el);
        }
        
        return this;
    };

    this.renderTocItem = function () {
        var el = $$('div');
        if (this.isTopLevelHeader()) {
            var titleEl = $$('span');
            titleEl.innerText = this.getTopLevelHeaderTitle();
            el.appendChild(titleEl);
            return el;
        }
        if (this.node.properties.label) {
            var labelEl = $$('.label', {text: this.node.properties.label});
            el.appendChild(labelEl);
        }
        var titleEl = $$('span');
        this.renderAnnotatedText([this.node.id, 'content'], titleEl);
        el.appendChild(titleEl);
        if (this.node.authors !== undefined) {
            if (this.node.authors.length > 0) {
                var authors = $$('div');
                var $authors = $(authors);
                $authors.addClass('authors');
                for (var i = 0; i < this.node.authors.length; i++) {
                    var authorsEl = document.createElement('span');
                    var $authorsEl = $(authorsEl);
                    $authorsEl.addClass('author');
                    authorsEl.appendChild(document.createTextNode(this.node.authors[i]));
                    authors.appendChild(authorsEl);
                    el.appendChild(authors);
                }
            }
        }



        return el;
    };

    this.getTopLevelHeaderTitle = function() {
        return this.node.getAbstract() ? 'Abstract' : 'Main text';
    }

    this.isTopLevelHeader = function() {
        return this.node.level === 1 && !this.node.content.length;
    }

};

HeadingView.Prototype.prototype = NodeView.prototype;
HeadingView.prototype = new HeadingView.Prototype();

module.exports = HeadingView;
