<?php
class editorSearchResGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modResource';
    public $classKey = 'modResource';
    public $defaultSortField = 'pagetitle';
    public $defaultSortDirection = 'ASC';
    //public $permission = 'list';


    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        if ($query) {
            $c->where([
            	'`id`' => $query,
            	'OR:`pagetitle`:LIKE' => "%{$query}%",
            ]);
        }
        if ($id = $this->getProperty('id')) {
            $c->where(['`id`' => $id, 'OR:`id`:>' => 0]);
            $c->sortby('FIELD(id, '.$id.')', DESC);
        }
        return $c;
    }
}

return 'editorSearchResGetListProcessor';