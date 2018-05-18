<?php
class Biodata extends CI_Controller{
	


	public function __construct(){

		parent::__construct();
		$this->load->model('model_siswa','siswa');

	}

	public function index(){
		$this->load->view('data_siswa');
	}

	public function tampil_data(){

		$tampildata = $this->siswa->tampildata();

		$siswa = array();

		foreach ($tampildata as $key => $data) {
			
			$siswa[] =  array('nama'         => $data->nama_lengkap,
							  'alamat'       =>$data->alamat,
							  'tanggal_lahir'=>$data->tanggal_lahir	
							);  
		}

		echo json_encode($siswa);
	}

	public function simpan_data(){

		$name      = $this->input->post('nama');
		$address   = $this->input->post('alamat');
		$brith_day = $this->input->post('tanggal_lahir');

		$data = array(
				      'nama_lengkap'  =>$name,
				      'alamat'=>$address,
				      'tanggal_lahir'=>$brith_day
		        );

		$sql = $this->siswa->tambah_data($data);  


		echo json_encode($data);       
	}

	public function update_data(){

		$id        = $this->input->post('id');
		$name      = $this->input->post('nama');
		$address   = $this->input->post('alamat');
		$brith_day = $this->input->post('tanggal_lahir');


		$data = array(
					  'nama_lengkap'=>$name,
					  'alamat'=>$address,
					  'tanggal_lahir'=>$brith_day	
				);

		$where = array('id' => $id);

		$query = $this->siswa->rubah_data($data,$where);
	}

	public function delete_data(){

		$id    = $this->input->post('id');
		$where = array('id'=>$id);
		$this->siswa->hapus_data($where); 

	}
}