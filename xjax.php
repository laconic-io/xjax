<?php
// 
// xjax ver 0.1 **beta**
// jQuery/php plugin
// laconic.io
//
class xjax{
	//
	// variables
	public $json = [];
	public $xjax = [];
	//
	// start at window
	public function win(){
		$this->xjax[] = [
			'*' , func_get_args()
		];
		return $this;
	}
	//
	// start at this (context)
	public function at(){
		$this->xjax[] = [
			'+' , func_get_args()
		];
	}
	//
	// start with $
	public function jq(){
		$args = func_get_args();
		$this->xjax[] = [
			'$' , ['$', $args[0] ]
		];
		if(isset($args[1])){
			$this->xjax[count($this->xjax)-1][] = array_slice($args, 1);
		}
		return $this;
	}
	//
	// start by jquery (select) context
	public function jqat(){
		$args = func_get_args();
		$this->xjax[] = [
			'@' , ['find', $args[0] ]
		];
		if(isset($args[1])){
			$this->xjax[count($this->xjax)-1][] = array_slice($args, 1);
		}
		return $this;
	}
	//
	// chain
	public function x(){
		$this->xjax[count($this->xjax)-1][] = func_get_args();
		return $this;
	}
	//
	// set
	public function set($obj, $val){
		$this->xjax[] = [
			'=', [$obj, $val]
		];
	}
	//
	// done
	public function done(){
		$this->json['_xjax'] = $this->xjax;
		die(json_encode($this->json));
	}
}
