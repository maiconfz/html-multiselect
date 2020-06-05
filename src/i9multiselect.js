(function ($) {

    class I9MultiselectComponent {
        constructor($select) {
            this.$select = $select;
            this.$options = null;
        }

        init() {
            this.$select.prop('multiple', true).attr('multiple', 'multiple');
            this.$options = this.$select.children('option');
            let self = this;

            this.$select
                .mousedown((event) => { event.preventDefault(); })
                .mouseup((event) => { event.preventDefault(); })
                .focus((event) => { event.preventDefault(); })
                .click((event) => {
                    event.preventDefault();
                    self.$select.focus();
                    self.toggleOptionSelect($(event.target));
                })
                .keydown((event) => {
                    switch (event.code) {
                        case 'ArrowDown':
                            event.preventDefault();
                            self.focusNextPreviousOption();
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            self.focusNextPreviousOption(true);
                            break;
                        case 'Space':
                            event.preventDefault();
                            self.toggleOptionSelect(self.$options.filter('[data-focus="true"]'));
                            break;
                    }
                });

            return this;
        }

        refreshOptions() {
            this.$options = this.$select.children();
            return this;
        }

        toggleOptionSelect($option) {
            const selectScrollTop = this.$select.scrollTop();

            if ($option.prop('selected') || $option.attr('selected') === 'selected') {
                $option.prop('selected', false).attr('selected', null);
            } else {
                $option.prop('selected', true).attr('selected', 'selected');
            }

            this.$options.filter('option[data-focus="true"]').data('focus', null).attr('data-focus', null).removeClass('focus');
            $option.data('focus', true).attr('data-focus', true).addClass('focus');

            setTimeout(() => { this.$select.scrollTop(selectScrollTop) }, 0);

            return this;
        };

        focusNextPreviousOption(previous) {
            let $focusedMultiselects = this.$select.find('option[data-focus="true"]');
            let $optionToFocus = null;

            if ($focusedMultiselects.length === 0) {
                $optionToFocus = previous ? this.$options.last() : this.$options.first();
            } else {
                let $focusedOption = this.$select.find('option[data-focus="true"]').data('focus', null).attr('data-focus', null).removeClass('focus');

                if (previous && $focusedOption.is(this.$options.first())) {
                    $optionToFocus = this.$options.last();
                } else if (previous) {
                    $optionToFocus = $focusedOption.prev();
                } else if ($focusedOption.is(this.$options.last())) {
                    $optionToFocus = this.$options.first();
                } else {
                    $optionToFocus = $focusedOption.next();
                }
            }

            $optionToFocus.data('focus', true).attr('data-focus', true).addClass('focus');

            let ignoreSpace = this.$select.position().top + parseInt(this.$select.css('border-top-width')) + parseInt(this.$select.css('padding-top'));
            let firstOptionRealTopPosition = this.$options.first().position().top - ignoreSpace;
            let optionToFocusRealTopPosition = $optionToFocus.position().top - ignoreSpace;
            let scrollTopPosition = optionToFocusRealTopPosition + Math.abs(firstOptionRealTopPosition);
            this.$select.scrollTop(scrollTopPosition);
            return this;
        };

    }

    $.fn.i9multiselect = function () {
        this.filter('select').each(function () {
            (new I9MultiselectComponent($(this))).init();
        });

        return this;
    };

}(jQuery));