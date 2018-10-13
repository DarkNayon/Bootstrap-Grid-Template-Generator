$('#templateEditor').on(
  'click',
  '.js_add',
  () ->
    $this = $(this)
    $template = $('#templates #template_' + $this.data('template')).clone().removeAttr('id')
    $this.closest($this.data('target')).append($template)
)

$('#templateEditor').on(
  'click'
  '.js_delete'
  () ->
    $(this).closest('.btn-toolbar').parent().remove()
)

$('#templateEditor').on(
  'click'
  '.js_edit'
  () ->
    window.templateEditor.activeBlock = $(this).closest('.btn-toolbar').parent()
    $('#editBlockModal').modal('show')
)

$('#editBlockModal').on(
  'show.bs.modal'
  (e) ->
    modal = $(this)
    parent = window.templateEditor.activeBlock
    modal.find('.form-group').hide()
    for key, value of parent.data()
      $formGroup = modal.find('#setting_' + key)
      if $formGroup.length < 1
        continue
      $formGroup.show()
      $formGroup.find('input, select').val(value)
)

$('#edit-save').on(
  'click',
  () ->
    modal = $(this).closest('#editBlockModal')
    parent = window.templateEditor.activeBlock
    attrs = {
      'class': parent.data('base_class')
    }

    for key, value of parent.data()
      $formGroup = modal.find('#setting_' + key)

      if $formGroup.length < 1
        continue

      $input = $formGroup.find('input, select')
      parent.attr('data_' + key, $input.val())
      
      if attrs[$input.data('attr')] == undefined
        attrs[$input.data('attr')] = $input.val()
      else
        attrs[$input.data('attr')] = attrs[$input.data('attr')] + ' ' + $input.val()
      
    for attr, value of attrs
      parent.attr(attr, value)
    modal.modal('hide')
)

$('#toggleEdit').on('click', () ->
  $(document.body).toggleClass('editing')
)
