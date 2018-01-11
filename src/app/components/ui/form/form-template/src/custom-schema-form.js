'use strict';

angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {

            var enumToTitleMap = function(enm) {
                var titleMap = []; //canonical titleMap format is a list.
                enm.forEach(function(name) {
                    titleMap.push({
                        name: name,
                        value: name
                    });
                });
                return titleMap;
            };

            var hDefault = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hDefault') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDefault';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDefault);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDefault',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDefault',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hDate = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hDate') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDate';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDate);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDate',
                'directives/decorators/bootstrap/custom/hDate.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDate',
                'directives/decorators/bootstrap/custom/hDate.html'
            );

            var hAmount = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hAmount') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hAmount';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hAmount);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hAmount',
                'directives/decorators/bootstrap/custom/hAmount.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hAmount',
                'directives/decorators/bootstrap/custom/hAmount.html'
            );

            var hNumber = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hNumber') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'number';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hNumber);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'number',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'number',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hPassword = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hPassword') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'password';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hPassword);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'password',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'password',
                'directives/decorators/bootstrap/custom/hDefault.html'
            );

            var hSelect = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hSelect' ) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hSelect';
                    if (!f.schema.titleMap) {
                        f.titleMap = enumToTitleMap(schema['enum']);
                    }
                    else{
                        //
                        if(f.schema.titleMap instanceof Array){
                            f.titleMap = f.schema.titleMap;
                        }
                        else{
                            f.titleMap = [];
                            var titleMap = f.schema.titleMap;
                            for(var key in titleMap){
                                f.titleMap.push({
                                    name: key,
                                    value: titleMap[key]
                                });
                            }
                        }
                    }
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hSelect);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hSelect',
                'directives/decorators/bootstrap/custom/hSelect.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hSelect',
                'directives/decorators/bootstrap/custom/hSelect.html'
            );
            var hLabel = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hLabel' ) {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hLabel';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hLabel);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hLabel',
                'directives/decorators/bootstrap/custom/hLabel.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hLabel',
                'directives/decorators/bootstrap/custom/hLabel.html'
            );
            var hTextarea = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'hTextarea') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hTextarea';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hTextarea);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hTextarea',
                'directives/decorators/bootstrap/custom/hTextArea.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hTextarea',
                'directives/decorators/bootstrap/custom/hTextArea.html'
            );

            var hDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'date') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'hDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(hDatePicker);

             //Add to the bootstrap directive
            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hDatePicker',
                'directives/decorators/bootstrap/custom/hDatePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hDatePicker',
                'directives/decorators/bootstrap/custom/hDatePicker.html'
            );

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'label',
                'directives/decorators/bootstrap/custom/label.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'label',
                'directives/decorators/bootstrap/custom/label.html'
            );

            var minDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'minDatePicker') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'minDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(minDatePicker);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'minDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'minDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );

            var maxDatePicker = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'maxDatePicker') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'maxDatePicker';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(maxDatePicker);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'maxDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'maxDatePicker',
                'directives/decorators/bootstrap/custom/datePicker.html'
            );

            var inputField = function(name, schema, options) {
                if (schema.type === 'string' && schema.format === 'inputField') {
                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'inputField';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.string.unshift(inputField);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'inputField',
                'directives/decorators/bootstrap/custom/input.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'inputField',
                'directives/decorators/bootstrap/custom/input.html'
            );


            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'adjecent',
                'directives/decorators/bootstrap/custom/adjecent.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'adjecent',
                'directives/decorators/bootstrap/custom/adjecent.html'
            );



            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'hContainer',
                'directives/decorators/bootstrap/custom/hContainer.html'
            );
            schemaFormDecoratorsProvider.createDirective(
                'hContainer',
                'directives/decorators/bootstrap/custom/hContainer.html'
            );
        }
    ]);
