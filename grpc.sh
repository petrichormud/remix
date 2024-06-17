./node_modules/.bin/grpc_tools_node_protoc \
	--js_out=import_style=commonjs,binary:./app/proto \
	--grpc_out=grpc_js:./app/proto \
	-I ./proto \
	proto/*.proto

protoc \
	--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
	--ts_out=grpc_js:./app/proto \
	-I ./proto \
	./proto/*.proto
